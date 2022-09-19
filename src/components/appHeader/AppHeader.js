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
              <NavLink end to="/comics">
                Comics
              </NavLink>
            </li>
            <li>
              <NavLink end to="/">
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
