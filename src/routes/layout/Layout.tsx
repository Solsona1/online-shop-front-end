import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import { SideMenu } from "../../components/sideMenu/SideMenu";
import "./Layout.css";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { getStore } from "../../services/ServicesMock.mock";

export const Layout = () => {
  const { setStore } = useStore();

  useEffect(() => {
    const store = getStore();
    setStore(store);
  }, []);

  return (
    <div id="layout">
      <div id="navbar">
        <Navbar />
        <SideMenu />
      </div>
      <div id="outlet">
        <Outlet />
      </div>
    </div>
  );
};
