import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} Worldiser
      </p>
    </footer>
  );
}

export default Footer;
