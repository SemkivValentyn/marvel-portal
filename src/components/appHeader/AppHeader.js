import { Link, NavLink } from "react-router-dom";
import "./appHeader.css";

const AppHeader = () => {
  return (
    <header>
      <Link to="/" id="logo">
        {" "}
        <span>Marvel</span> portal
      </Link>
      <nav>
        <div className="dropdown">
          <div className="dropdown-content">
            <li>
              <NavLink end activeStyle={{ color: "#9f0013" }} to="/comics">
                Comics
              </NavLink>
            </li>
            <li>
              <NavLink end activeStyle={{ color: "#9f0013" }} to="/">
                Characters
              </NavLink>
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
