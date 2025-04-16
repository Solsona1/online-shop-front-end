import { Link } from "react-router-dom";
import "./SideMenu.css";
import { Role } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { useUser } from "../../hooks/useUser";

export const SideMenu = () => {
  const { user, setUser } = useUser();
  const { store } = useStore();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleNavigation = (route: string) => {
    handleMenu();
    navigate(route);
  };

  const handleLogOut = (route: string) => {
    setUser({ email: "", role: Role.VISITOR });
    handleNavigation(route);
  };

  return (
    <div id="side-menu">
      {openMenu && (
        <div id="menu">
          <button id="close-btn" onClick={handleMenu}>
            Close
          </button>
          <p onClick={() => handleNavigation("/")}>Home</p>
          <p onClick={() => handleNavigation("/location")}>Location</p>
          <p onClick={() => handleNavigation("/list")}>Products</p>
          {(user.role as Role) === (Role.ADMIN as Role) && (
            <p onClick={() => handleNavigation("/manage-products")}>Manage</p>
          )}
          {(user.role as Role) === (Role.CLIENT as Role) && (
            <p onClick={() => handleNavigation("/cart")}>Cart</p>
          )}
          <div id="login-container">
            {(user.role as Role) !== (Role.VISITOR as Role) ? (
              <div className="user">
                <span>
                  {user.email} - {Role[user.role]}
                </span>
                <button onClick={() => handleLogOut("/")}>Log out</button>
              </div>
            ) : (
              <>
                <button
                  className="login-btn"
                  onClick={() => handleNavigation("/login")}
                >
                  Sign In
                </button>
                <button
                  className="login-btn"
                  onClick={() => handleNavigation("/")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <div id="header-container">
        <Link to={"/"} className="logo">
          <img src={store.logo}></img>
        </Link>
        <button type="button" onClick={handleMenu}>
          Menu
        </button>
      </div>
    </div>
  );
};
