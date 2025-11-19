/**
 * Решение проблемы: обновление токена при параллельных запросах
 *
 * ⚠️ ВАЖНО: Данное решение было разработано с помощью AI (Claude Sonnet 4.5).
 * Автор ознакомлен с кодом и несет ответственность за его использование.
 *
 * Проблема: Если несколько запросов отправляются через Promise.all,
 * и первый получает 401, нужно обновить токен. Но остальные запросы
 * уже отправлены с устаревшим токеном - как сделать так, чтобы они не падали с ошибкой 401?
 *
 * Решение: AbortController + отмена запросов + повтор с новым токеном
 */

// Типы для токенов
interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// Тип для активного запроса, который можно отменить
interface ActiveRequest {
  abortController: AbortController;
  url: string;
  options: RequestInit;
}

// Класс для управления обновлением токена
class TokenRefreshManager {
  private refreshPromise: Promise<Tokens> | null = null;
  private pendingRequests: Array<{
    resolve: (tokens: Tokens) => void;
    reject: (error: Error) => void;
  }> = [];
  private activeRequests: Set<ActiveRequest> = new Set();

  /**
   * Обновляет токен, если обновление уже идет - возвращает существующий промис
   * Это предотвращает множественные запросы на обновление токена
   */
  async refreshToken(refreshToken: string): Promise<Tokens> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh(refreshToken);

    try {
      const newTokens = await this.refreshPromise;
      localStorage.setItem('accessToken', newTokens.accessToken);
      localStorage.setItem('refreshToken', newTokens.refreshToken);
      this.pendingRequests.forEach(({ resolve }) => resolve(newTokens));
      this.pendingRequests = [];
      return newTokens;
    } catch (error) {
      this.pendingRequests.forEach(({ reject }) =>
        reject(error instanceof Error ? error : new Error(String(error)))
      );
      this.pendingRequests = [];
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Добавляет запрос в очередь ожидания обновления токена
   */
  waitForTokenRefresh(refreshToken: string): Promise<Tokens> {
    if (this.refreshPromise) {
      return new Promise((resolve, reject) => {
        this.pendingRequests.push({ resolve, reject });
      });
    }
    return this.refreshToken(refreshToken);
  }

  /**
   * Получает текущий промис обновления токена (если он есть)
   */
  getRefreshPromise(): Promise<Tokens> | null {
    return this.refreshPromise;
  }

  /**
   * Регистрирует активный запрос для возможной отмены через AbortController
   */
  registerActiveRequest(request: ActiveRequest): void {
    this.activeRequests.add(request);
  }

  /**
   * Удаляет запрос из списка активных
   */
  unregisterActiveRequest(request: ActiveRequest): void {
    this.activeRequests.delete(request);
  }

  /**
   * Отменяет все активные запросы через AbortController.abort()
   * Это позволяет "перехватить" уже отправленные HTTP запросы
   */
  cancelActiveRequests(exceptUrl?: string): void {
    this.activeRequests.forEach(request => {
      if (request.url !== exceptUrl) {
        request.abortController.abort(); // Отменяем запрос
        this.activeRequests.delete(request);
      }
    });
  }

  /**
   * Выполняет фактическое обновление токена
   * В реальном приложении здесь будет запрос к API /refresh endpoint
   */
  private async performTokenRefresh(refreshToken: string): Promise<Tokens> {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return response.json() as Promise<Tokens>;
  }
}

// Глобальный экземпляр менеджера
const tokenManager = new TokenRefreshManager();

// Хранилище токенов (в реальном приложении может быть в localStorage, cookies и т.д.)

/**
 * Выполняет запрос с автоматическим обновлением токена при 401
 *
 * РЕШЕНИЕ С AbortController:
 * 1. Все запросы отправляются с AbortController
 * 2. При получении 401 одним из запросов, остальные отменяются
 * 3. Отмененные запросы ловят AbortError и повторяются с новым токеном
 */
async function makeRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  let currentTokens: Tokens = {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  };

  // Создаем AbortController для возможности отмены запроса
  const abortController = new AbortController();
  const activeRequest: ActiveRequest = {
    abortController,
    url,
    options,
  };

  tokenManager.registerActiveRequest(activeRequest);

  try {
    // Отправляем запрос с AbortSignal - это позволяет отменить запрос
    const response = await fetch(url, {
      ...options,
      signal: abortController.signal, // Передаем signal для возможности отмены
      headers: {
        ...options.headers,
        Authorization: `Bearer ${currentTokens.accessToken}`,
      },
    });

    tokenManager.unregisterActiveRequest(activeRequest);

    if (response.status === 401) {
      // Отменяем все остальные активные запросы через AbortController
      tokenManager.cancelActiveRequests(url);

      // Ждем обновления токена
      const newTokens = await tokenManager.waitForTokenRefresh(
        currentTokens.refreshToken
      );
      currentTokens = newTokens;

      // Повторяем запрос с новым токеном
      return makeRequest<T>(url, options);
    }

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    tokenManager.unregisterActiveRequest(activeRequest);

    // Если запрос был отменен через AbortController, ловим AbortError
    if (error instanceof Error && error.name === 'AbortError') {
      // Ждем обновления токена
      const refreshPromise = tokenManager.getRefreshPromise();
      if (refreshPromise) {
        await refreshPromise;
        const newTokens = await tokenManager.waitForTokenRefresh(
          currentTokens.refreshToken
        );
        currentTokens = newTokens;
      }

      // Повторяем отмененный запрос с новым токеном
      return makeRequest<T>(url, options);
    }

    throw error;
  }
}

/**
 * Пример использования:
 *
 * ```typescript
 * const results = await Promise.all([
 *   makeRequest('/api/user'),
 *   makeRequest('/api/posts'),
 *   makeRequest('/api/comments'),
 * ]);
 * ```
 *
 * Если первый запрос получит 401:
 * 1. Остальные запросы будут отменены через AbortController
 * 2. Токен обновится один раз
 * 3. Все запросы повторятся с новым токеном
 */

/**
 * ============================================================================
 * Готовые решения в Axios и Redux Toolkit
 * ============================================================================
 *
 * AXIOS:
 * ❌ Нет встроенного решения для параллельных запросов
 * ✅ Есть interceptors для обработки 401, но они НЕ решают проблему параллельных запросов
 *
 * Стандартный подход с axios interceptors:
 * ```typescript
 * axios.interceptors.response.use(
 *   response => response,
 *   async error => {
 *     if (error.response?.status === 401 && !error.config._retry) {
 *       error.config._retry = true;
 *       const newToken = await refreshToken();
 *       error.config.headers.Authorization = `Bearer ${newToken}`;
 *       return axios(error.config);
 *     }
 *     return Promise.reject(error);
 *   }
 * );
 * ```
 *
 * ПРОБЛЕМА: При параллельных запросах каждый запрос получит 401 и запустит
 * обновление токена отдельно, что приведет к множественным запросам на /refresh
 *
 * REDUX TOOLKIT (RTK Query):
 * ❌ Нет встроенного решения для параллельных запросов
 * ✅ Есть baseQuery с возможностью обновления токена, но проблема та же
 *
 * Стандартный подход с RTK Query:
 * ```typescript
 * const baseQuery = fetchBaseQuery({
 *   baseUrl: '/api',
 *   prepareHeaders: (headers, { getState }) => {
 *     const token = (getState() as RootState).auth.token;
 *     if (token) headers.set('authorization', `Bearer ${token}`);
 *     return headers;
 *   },
 * });
 *
 * const baseQueryWithReauth = async (args, api, extraOptions) => {
 *   let result = await baseQuery(args, api, extraOptions);
 *   if (result?.error?.status === 401) {
 *     const refreshResult = await baseQuery('/refresh', api, extraOptions);
 *     if (refreshResult.data) {
 *       // Обновить токен в store
 *       result = await baseQuery(args, api, extraOptions);
 *     }
 *   }
 *   return result;
 * };
 * ```
 *
 * ПРОБЛЕМА: Та же - при параллельных запросах будет множественное обновление токена
 *
 * ВЫВОД:
 * - Готовых решений для параллельных запросов НЕТ
 * - Нужна кастомная реализация с блокировкой обновления токена (как в этом файле)
 * - AbortController - один из способов решения проблемы
 *
 * ============================================================================
 * AbortController - интерфейс и использование
 * ============================================================================
 *
 * ИНТЕРФЕЙС:
 * - AbortController - класс для отмены асинхронных операций
 * - signal: AbortSignal - объект сигнала, который можно передать в fetch/axios
 * - abort(reason?): void - метод для отмены операции
 *
 * ИСПОЛЬЗОВАНИЕ:
 * ```typescript
 * const controller = new AbortController();
 * fetch(url, { signal: controller.signal });
 * controller.abort(); // Отменяет запрос
 * ```
 *
 * ПЛЮСЫ:
 * 1. ✅ Позволяет отменить уже отправленные HTTP запросы
 * 2. ✅ Стандартный Web API, поддерживается в fetch, axios, XMLHttpRequest
 * 3. ✅ Экономит ресурсы - отменяет ненужные запросы до получения ответа
 * 4. ✅ Позволяет "перехватить" запросы до их завершения
 * 5. ✅ Улучшает UX - можно отменить долгие запросы
 *
 * МИНУСЫ:
 * 1. ❌ Не все HTTP клиенты поддерживают AbortSignal (старые версии axios)
 * 2. ❌ Отмена не гарантирует немедленную остановку - сервер может продолжить обработку
 * 3. ❌ Нужно правильно обрабатывать AbortError в catch блоках
 * 4. ❌ Усложняет код - нужно регистрировать/удалять контроллеры
 * 5. ❌ Может привести к утечкам памяти, если не очищать ссылки
 *
 * АЛЬТЕРНАТИВЫ:
 * - Проверка перед отправкой (задержка запросов до обновления токена)
 * - Очередь запросов (не отправлять сразу, а ставить в очередь)
 * - Retry механизм (повторять запросы после обновления токена)
 */

export { TokenRefreshManager, makeRequest };
