import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthRoutes from "./components/routes/AuthRoutes";
import PanelRoute from "./components/routes/PanelRoute";
const Home = lazy(() => import("./components/panel/home/Home"));
const Resumes = lazy(() => import("./components/panel/resume/Resumes"));
const Plan = lazy(() => import("./components/panel/plans/Plan"));
const Help = lazy(() => import("./components/panel/help/Help"));
const Editor = lazy(() => import("./components/panel/editor/Editor"));

const App = () => {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* PRIVATE ROUTES */}
        <Route path="/panel" element={<PanelRoute />}>
          <Route
            path="/panel/home"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/panel/resume"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Resumes />
              </Suspense>
            }
          />
          <Route
            path="/panel/editor"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Editor />
              </Suspense>
            }
          />

          <Route
            path="/panel/plans"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Plan />
              </Suspense>
            }
          />
          <Route
            path="/panel/help"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Help />
              </Suspense>
            }
          />
        </Route>

        {/* default routes */}
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
