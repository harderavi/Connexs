import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PageLoading from "./component/PageLoading";
import PrivateRoute from "./component/PrivateRoute";
const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./pages/Layout"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoute/>} > 
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            </Route>
          </Route>
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;
