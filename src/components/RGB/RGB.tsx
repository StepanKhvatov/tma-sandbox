import type { RGB as RGBType } from '@telegram-apps/sdk-react';
import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import { clsx } from 'clsx';

const rgb = tv({
  slots: {
    root: '',
    icon: '',
  },
});

const { root, icon } = rgb();

export type RGBProps = JSX.IntrinsicElements['div'] & {
  color: RGBType;
};

export const RGB: FC<RGBProps> = ({ color, className, ...rest }) => (
  <span {...rest} className={clsx(root(), className)}>
    <i className={icon()} style={{ backgroundColor: color }} />
    {color}
  </span>
);
