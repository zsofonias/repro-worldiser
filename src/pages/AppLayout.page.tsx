import styles from './app-layout.module.css';

import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import User from '../components/User';

function AppLayout() {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
