import {
  IoIosBrush,
  IoIosCard,
  IoIosHelpCircleOutline,
  IoMdDocument,
  IoMdHome,
} from "react-icons/io";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidenav">
      <div className="sidenav__profile">
        <div className="sidenav__profile-title ">Resume Builder</div>
      </div>
      <div className="row row--align-v-center row--align-h-center">
        <ul className="navList">
          <NavLink
            to="/panel/home"
            className={({ isActive }) => (isActive ? "navList__heading__active" : "")}
          >
            <li className="navList__heading">
              Home
              <IoMdHome />
            </li>
          </NavLink>
          <NavLink
            to="/panel/resume"
            className={({ isActive }) => (isActive ? "navList__heading__active" : "")}
          >
            <li className="navList__heading">
              Resume
              <IoMdDocument />
            </li>
          </NavLink>
          <NavLink
            to="/panel/editor"
            className={({ isActive }) => (isActive ? "navList__heading__active" : "")}
          >
            <li className="navList__heading">
              Editor
              <IoIosBrush />
            </li>
          </NavLink>
          <NavLink
            to="/panel/plans"
            className={({ isActive }) => (isActive ? "navList__heading__active" : "")}
          >
            <li className="navList__heading">
              Plans
              <IoIosCard />
            </li>
          </NavLink>
          <NavLink
            to="/panel/help"
            className={({ isActive }) => (isActive ? "navList__heading__active" : "")}
          >
            <li className="navList__heading">
              Help
              <IoIosHelpCircleOutline />
            </li>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
