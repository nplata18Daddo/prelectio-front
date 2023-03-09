import { Route, Routes } from "react-router";
import { Layout } from "../components/layout";
import { Home } from "../pages";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
