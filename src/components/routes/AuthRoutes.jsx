import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../auth/Login"));
const Signup = lazy(() => import("../auth/Signup"));
const Forget = lazy(() => import("../auth/Forget"));
const Reset = lazy(() => import("../auth/Reset"));
const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <Suspense fallback={<>Loading...</>}>
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<>Loading...</>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/forget"
        element={
          <Suspense fallback={<>Loading...</>}>
            <Forget />
          </Suspense>
        }
      />
      <Route
        path="/reset"
        element={
          <Suspense fallback={<>Loading...</>}>
            <Reset />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
export default AuthRoutes;
