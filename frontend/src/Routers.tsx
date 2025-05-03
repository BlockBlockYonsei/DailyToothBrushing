import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import AnotherPage from "./AnotherPage";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<App />}></Route>
          <Route path="/another" element={<AnotherPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
