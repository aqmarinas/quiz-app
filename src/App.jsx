import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Result from "./pages/Result";
import RequireAuth from "./components/auth/RequireAuth";
// import Layout from "./components/layouts/Layout";
// import Layout from "./components/layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={<NotFound />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/"
            element={<Quiz />}
          />
          <Route
            path="/result"
            element={<Result />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
