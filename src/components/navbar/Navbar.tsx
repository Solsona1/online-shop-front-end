import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Role } from "../../types";
import { useStore } from "../../hooks/useStore";
import { useUser } from "../../hooks/useUser";

export const Navbar = () => {
  const { user, setUser } = useUser();
  const { store } = useStore();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser({ email: "", role: Role.VISITOR });
    navigate("/");
  };

  return (
    <nav id="nav-bar">
      <div className="left">
        <Link to={"/"} className="logo">
          <img src={store.logo}></img>
        </Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/location"}>Location</Link>
        <Link to={"/list"}>Products</Link>
        {(user.role as Role) === (Role.ADMIN as Role) && (
          <Link to={"/manage-products"}>Manage</Link>
        )}
        {(user.role as Role) === (Role.CLIENT as Role) && (
          <Link to={"/cart"}>Cart</Link>
        )}
      </div>
      <div className="right">
        {(user.role as Role) !== (Role.VISITOR as Role) ? (
          <div className="user">
            <span>
              {user.email} - {Role[user.role]}
            </span>
            <button onClick={handleLogOut}>Log out</button>
          </div>
        ) : (
          <>
            <Link to={"/login"} className="button">
              Sign In
            </Link>
            <Link to={"/"} className="button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
