import { IoIosPower } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../app/features/user/userSlice";

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logout());
    navigate("auth/login");
  };
  return (
    <header className="header">
      <div className="header__search">
        {window.location.href?.includes("panel/home") && (
          <input className="header__input" placeholder="Search..." />
        )}
      </div>
      <IoIosPower className="header__avatar" onClick={handleLogout} />
    </header>
  );
};

export default TopHeader;
