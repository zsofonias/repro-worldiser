import Map from '../components/Map';
import Sidebar from '../components/Sidebar';

import styles from './app-layout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
