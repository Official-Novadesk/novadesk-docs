import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type ReturnValueProps = {
  type: string;
  children: ReactNode;
  className?: string;
};

export function ReturnValue({type, children, className}: ReturnValueProps) {
  return (
    <div className={clsx(styles.returnValue, className)}>
      <div className={styles.header}>
        <span className={styles.label}>Return Value</span>
        <span className={styles.type}>Type: {type}</span>
      </div>
      <div className={styles.description}>{children}</div>
    </div>
  );
}