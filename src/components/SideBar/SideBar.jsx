import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import {useAuth} from "../../hook/useAuth.js";

function SideBar() {
  const {auth}=useAuth();
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </li>


                  <li>
                    <Link className={styles.link} to="/products">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.link} to="/productDetails">
                      ProductDetails
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.link} to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.link} to="/attributes">
                      Attributes
                    </Link>
                  </li>

                  <li>
                    <Link className={styles.link}>Users</Link>
                  </li>
                  <li>
                    <Link className={styles.link}>Carts</Link>
                  </li>


      </ul>
    </div>
  );
}

export default SideBar;
