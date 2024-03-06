import styles from './PageNotFound.css'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
    <div className={styles.main}>
        <nav className={styles.shelf}>
            <Link to={'/'} className={`${styles.book} ${styles.home}-${styles.page}`}>Home page</Link>
            <Link to={'/about'} className={`${styles.book} ${styles.about}-${styles.us}`}>About us</Link>
            <Link to={'/contact'} className={`${styles.book} ${styles.contact}`}>Contact</Link>
            
            <span className={`${styles.book} ${styles.not}-${styles.found}`}></span>
            
            <span className={`${styles.door} ${styles.left}`}></span>
            <span className={`${styles.door} ${styles.right}`}></span>
        </nav>
        <h1 className={styles.h1}>Error 404</h1>
        <p className={styles.p}>The page you&#39;re loking for can&#39;t be found</p></div>
    )
};

export default PageNotFound;