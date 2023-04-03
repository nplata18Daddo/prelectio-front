import { Route, Routes, useLocation } from "react-router";
import { Layout } from "../components/layout";
import { Home, RegisterDeportista } from "../pages";
import { ForgotPassword } from "../pages/auth/forgotPassword";
import { Login } from "../pages/auth/login";
import { AnimatePresence } from "framer-motion";
import { ChangePass } from "../pages/auth/changePass";
import { Register } from "../pages/auth/register";
import { RecruiterRegister } from "../pages/recruiter/recruiterRegister";
import ProtectedRoute from "./protectedRoute";
import { NotFound } from "../pages/general/notFound";
import { LayoutUser } from "../components/layout/user/layoutUser";
import { AdminHome } from "../pages/admin/adminHome";
import { AdminRecruiters } from "../pages/admin/adminRecruiters";
import { AdminRecruiterDetail } from "../pages/admin/adminRecruiterDetail";
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
        {/*Admin routes */}
        <Route element={<LayoutUser role="admin" routeName="Inicio" />}>
          <Route path="admin">
            <Route path="home" element={<AdminHome />} />
          </Route>
        </Route>
        <Route element={<LayoutUser role="admin" routeName="Reclutadores" />}>
          <Route path="admin">
            <Route path="recruiters" element={<AdminRecruiters />} />
            <Route path="recruiter/:id" element={<AdminRecruiterDetail />} />
          </Route>
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/registerDeportista" element={<RegisterDeportista />} />
      </Routes>
    </AnimatePresence>
  );
}
export default AppRoutes;
