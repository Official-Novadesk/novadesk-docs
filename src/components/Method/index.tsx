import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { ReturnValue } from '../ReturnValue';

type MethodProps = {
  signature: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type MethodParamProps = {
  name: string;
  type?: string;
  children: ReactNode;
  className?: string;
};

export function Method({signature, description, children, className}: MethodProps) {
  const slug = signature
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.clientHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      history.pushState(null, '', `#${slug}`);
    }
  };

  return (
    <div className={clsx(styles.method, className)} id={slug}>
      <div className={styles.header}>
        <a className={styles.signature} href={`#${slug}`} onClick={handleAnchorClick}>
          {signature}
        </a>
      </div>
      {description && <div className={styles.description}>{description}</div>}
      {children && <div className={styles.params}>{children}</div>}
    </div>
  );
}

export function MethodParam({name, type, children, className}: MethodParamProps) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.clientHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      history.pushState(null, '', `#${slug}`);
    }
  };

  return (
    <div className={clsx(styles.param, className)} id={slug}>
      <div className={styles.paramHeader}>
        <a className={styles.paramName} href={`#${slug}`} onClick={handleAnchorClick}>
          {name}
        </a>
        {type && <span className={styles.paramType}>Type: {type}</span>}
      </div>
      <div className={styles.paramBody}>{children}</div>
    </div>
  );
}

export { ReturnValue };
