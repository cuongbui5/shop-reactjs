import styles from "./Header.module.css";
import { Link,useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function Header() {

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login")
  
}

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>Ecommerce Store</p>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
        <button type="button"><ion-icon name="search-outline"></ion-icon></button>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/register">Register</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/login">Login</Link>
          </li>
          <li className={styles.navItem}>
            <p onClick={handleLogout}>Logout</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
