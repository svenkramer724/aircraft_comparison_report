import { Link, useLocation } from "react-router-dom";
import name_background from "../../../assets/name_background.png";

import cn from "classnames";
import styles from "./Header.module.scss";

const Header = () => {
  const location = useLocation();
  let headerTitle = "Search Aircraft";
  let aircraft_year = "";
  if (location.pathname === "/") {
    headerTitle = "Search Aircraft";
    aircraft_year = "";
  } else if (location.pathname === "/compare") {
    headerTitle = "Compare Aircraft";
    aircraft_year = "";
  } else if (location.state !== null) {
    headerTitle = location.state.aircraftData.aircraft_name;
    aircraft_year =
      location.state.aircraftData.production_start +
      " - " +
      location.state.aircraftData.production_end;
  }

  // responvive menu toggle
  const toggleMenu = () => {
    const menu = document.querySelector(`.${styles.menu}`);
    menu.classList.toggle(styles.active);
  };

  return (
    <header className={cn(styles.header)}>
      <div className={cn(styles.nav_wrapper)}>
        <nav className={cn(styles.nav)}>
          <ul>
            <li className={cn(styles.logo)}>
              <a href="https://compareprivateplanes.com">
                <img
                  src="https://compareprivateplanes.com/images/site/cropped-logo-blue-1536x997.png"
                  alt="logo"
                  className={cn(styles.logo_img)}
                />
              </a>
            </li>
            <li>
              <a href="https://compareprivateplanes.com">Home</a>
            </li>
            <li>
              {" "}
              <Link to="/">Search Aircraft</Link>
            </li>
            <li>
              <a href="https://compareprivateplanes.com/premium">Dashboard</a>
            </li>
            <li>
              <a href="https://compareprivateplanes.com/register/your-membership">
                My Account
              </a>
            </li>
          </ul>
        </nav>
        <nav className={cn(styles.responsive_menu)}>
          <div className={cn(styles.menu_icon)} onClick={() => toggleMenu()}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className={cn(styles.menu)}>
            <p>
              <Link to="/">Home</Link>
            </p>
            <p>Search Aircraft</p>
            <p>
              <Link to="/aircraft-comparisons">Aircraft Comparisons</Link>
            </p>
            <p>
              <Link to="/basics">Dashboard</Link>
            </p>
            <p>Engines</p>
            <p>Ways To Fly</p>
            <p>Free Tools</p>
            <p>
              <Link to="/premium">Premium</Link>
            </p>
            <p>
              <Link to="/premium">About</Link>
            </p>
            <p>
              <Link to="/premium">Contact</Link>
            </p>
          </div>
        </nav>
      </div>
      <div
        className={cn(styles.aircraft_name)}
        style={{ backgroundImage: "url('" + name_background + "')" }}
      >
        <h1 className={styles.name}>{headerTitle}</h1>
        <p className={styles.aircraft_year}>{aircraft_year}</p>
      </div>
    </header>
  );
};

export default Header;
