/* eslint-disable react/prop-types */
import styles from "./Overlay.module.css";
function Overlay({onClick}) {
  return <div className={styles.overlay} onClick={onClick}></div>;
}

export default Overlay;
