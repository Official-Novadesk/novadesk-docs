import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type ParamsProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

type ParamProps = {
  name: string;
  type?: string;
  children: ReactNode;
  className?: string;
};

export function Params({title = 'Parameters', children, className}: ParamsProps) {
  return (
    <div className={clsx(styles.params, className)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.list}>{children}</div>
    </div>
  );
}

export function Param({name, type, children, className}: ParamProps) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <div className={clsx(styles.param, className)} id={slug}>
      <div className={styles.paramHeader}>
        <a className={styles.paramName} href={`#${slug}`}>
          {name}
        </a>
        {type && <span className={styles.paramType}>Type: {type}</span>}
      </div>
      <div className={styles.paramBody}>{children}</div>
    </div>
  );
}
