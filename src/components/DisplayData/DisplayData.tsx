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

export const DisplayData: FC<DisplayDataProps> = ({ header, rows }) => (
  <div className="section">
    {header && <div className="section__header">{header}</div>}
    <div className="section__content">
      {rows.map((item, idx) => {
        let valueNode: ReactNode;

        if (item.value === undefined) {
          valueNode = <i>empty</i>;
        } else {
          if ('type' in item) {
            valueNode = <Link href={item.value}>Open</Link>;
          } else if (typeof item.value === 'string') {
            valueNode = isRGB(item.value) ? (
              <RGB color={item.value} />
            ) : (
              item.value
            );
          } else if (typeof item.value === 'boolean') {
            valueNode = (
              <input type="checkbox" checked={item.value} disabled readOnly />
            );
          } else {
            valueNode = item.value;
          }
        }

        return (
          <div className={`cell ${line()}`} key={idx}>
            <div className="cell__content">
              <div className="cell__subtitle">{item.title}</div>
              <span className={lineValue()}>{valueNode}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
