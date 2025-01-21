import { NavLink } from 'react-router';

import styles from './page-nav.module.css';
import Logo from './Logo';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
