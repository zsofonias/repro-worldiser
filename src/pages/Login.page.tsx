import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './login.module.css';

import { useAuth } from '../context/AuthContext';

import PageNav from '../components/PageNav';
import Button from '../components/UI/Button';
import Message from '../components/Message';

function Login() {
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false);

  const { login, isAuthenticated, error } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return alert('Please enter email and password');
    }

    login(email, password);
  }

  function handleToggleViewPassword() {
    setViewPassword((prevVal) => !prevVal);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      {error && <Message message={error} />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type={viewPassword ? 'text' : 'password'}
            id="password"
            ref={passwordRef}
          />
        </div>

        <button type="button" onClick={handleToggleViewPassword}>
          Toggle View Password
        </button>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
