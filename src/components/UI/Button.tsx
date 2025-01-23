import { MouseEventHandler, ReactNode } from 'react';

import styles from './button.module.css';

interface IButtonProps {
  children: ReactNode;
  type: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, type, onClick }: IButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
