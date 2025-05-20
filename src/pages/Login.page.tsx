import { FormEvent, useRef, useState } from 'react';
import PageNav from '../components/PageNav';
import styles from './login.module.css';

function Login() {
  // PRE-FILL FOR DEV PURPOSES
  // const [email, setEmail] = useState('jack@example.com');
  // const [password, setPassword] = useState('qwerty');
  const [viewPassword, setViewPassword] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    console.log(email, password);
    e.currentTarget.reset();
  }

  function handleToggleViewPassword() {
    setViewPassword((prevVal) => !prevVal);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
            ref={emailRef}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type={viewPassword ? 'text' : 'password'}
            id="password"
            // onChange={(e) => setPassword(e.target.value)}
            // value={password}
            ref={passwordRef}
          />
        </div>

        <button type="button" onClick={handleToggleViewPassword}>
          Toggle View Password
        </button>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
