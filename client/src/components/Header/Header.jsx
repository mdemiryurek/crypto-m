import styles from './Header.module.scss';
import logo from '/logo.svg';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <a href='/'
                    className={styles.logo}>
                </a>
            </div>
        </header>
    )
}

export default Header;