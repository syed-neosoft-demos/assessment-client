import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const PanelRoute = () => {
  const token = window.localStorage.getItem("auth_token");
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    return <Navigate to="auth/login" />;
  }
  return decoded?.id ? <Outlet /> : <Navigate to="auth/login" />;
};

export default PanelRoute;
