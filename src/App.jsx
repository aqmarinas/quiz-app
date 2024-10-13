import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Result from "./pages/Result";
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
          path="/"
          // element={<Layout />}
          element={<Quiz />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/result"
          element={<Result />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
