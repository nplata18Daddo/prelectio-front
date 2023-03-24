import { Route, Routes, useLocation } from "react-router";
import { Layout } from "../components/layout";
import { Home } from "../pages";
import { ForgotPassword } from "../pages/auth/forgotPassword";
import { Login } from "../pages/auth/login";
import { AnimatePresence } from "framer-motion";
import { ChangePass } from "../pages/auth/changePass";
function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePass />} />
      </Routes>
    </AnimatePresence>
  );
}
export default AppRoutes;
