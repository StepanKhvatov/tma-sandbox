import { isRGB } from '@telegram-apps/sdk-react';
import type { FC, ReactNode } from 'react';

import { tv } from 'tailwind-variants/lite';
import { RGB } from '@/components/RGB/RGB';
import { Link } from '@/components/Link/Link';

const displayData = tv({
  slots: {
    line: '',
    lineValue: '',
  },
});

const { line, lineValue } = displayData();

export type DisplayDataRow = { title: string } & (
  | { type: 'link'; value?: string }
  | { value: ReactNode }
);

export interface DisplayDataProps {
  header?: ReactNode;
  footer?: ReactNode;
  rows: DisplayDataRow[];
}

export const DisplayData: FC<DisplayDataProps> = ({ header, rows, footer }) => (
  <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
    {header && (
      <div className="prose prose-lg max-w-none text-xl font-bold px-6 py-4 border-b text-gray-900 border-gray-200">
        {header}
      </div>
    )}
    <div className="divide-y divide-gray-200">
      {rows.map((item, idx) => {
        let valueNode: ReactNode;

        if (item.value === undefined) {
          valueNode = <i className="text-gray-400 italic">empty</i>;
        } else {
          if ('type' in item) {
            valueNode = (
              <Link
                href={item.value}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Open →
              </Link>
            );
          } else if (typeof item.value === 'string') {
            valueNode = isRGB(item.value) ? (
              <RGB color={item.value} />
            ) : (
              <span className="font-mono text-sm break-all">{item.value}</span>
            );
          } else if (typeof item.value === 'boolean') {
            valueNode = (
              <input
                type="checkbox"
                checked={item.value}
                disabled
                readOnly
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            );
          } else {
            valueNode = item.value;
          }
        }

        return (
          <div
            className={`flex items-center px-6 py-4 transition-all duration-200 bg-white hover:bg-gray-50 ${line()}`}
            key={idx}
          >
            <div className="flex-1">
              <div className="text-sm font-medium mb-1 text-gray-500">
                {item.title}
              </div>
              <div className={lineValue()}>{valueNode}</div>
            </div>
          </div>
        );
      })}
    </div>
    {footer && (
      <div className="prose prose-sm max-w-none px-6 py-4 text-sm text-gray-400 border-t border-gray-200">
        {footer}
      </div>
    )}
  </div>
);
