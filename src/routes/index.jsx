import { Route, Routes, useLocation } from "react-router";
import { Layout } from "../components/layout";
import { Home } from "../pages";
import { ForgotPassword } from "../pages/auth/forgotPassword";
import { Login } from "../pages/auth/login";
import { AnimatePresence } from "framer-motion";
import { ChangePass } from "../pages/auth/changePass";
import { Register } from "../pages/auth/register";
import { RecruiterRegister } from "../pages/recruiter/recruiterRegister";
import ProtectedRoute from "./protectedRoute";
import { NotFound } from "../pages/general/notFound";
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

        <Route path="/register" element={<Register />} />
        <Route path="/registerRecruit" element={<RecruiterRegister />} />

        <Route element={<ProtectedRoute requiredRole={"user"} />}>
          <Route path="user">
            <Route path="changePassword" element={<ChangePass />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Not Found */}
    </AnimatePresence>
  );
}
export default AppRoutes;
