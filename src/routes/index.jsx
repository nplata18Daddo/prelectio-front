import { Route, Routes } from "react-router";
import { Layout } from "../components/layout";
import { Home } from "../pages";
import { Login } from "../pages/auth/login";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default AppRoutes;
