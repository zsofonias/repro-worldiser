import { Outlet } from 'react-router';
import AppNav from './AppNav';
import Footer from './Footer';
import Logo from './PageNav/Logo';

import styles from './sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
