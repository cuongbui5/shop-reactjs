import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import styles from "./AppLayout.module.css";


function AppLayout() {
  return (
    <div>
      <Header />
      <div className={styles.layout}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
  
}

export default AppLayout;
