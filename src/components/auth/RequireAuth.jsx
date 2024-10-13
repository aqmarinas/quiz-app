import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Quiz from "../../pages/Quiz";

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.username ? (
    <Quiz />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
}
