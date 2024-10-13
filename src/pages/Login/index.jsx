import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { login } from "../../services/api";
import Layout from "@/components/layouts/Layout";
import Alert from "../../components/ui/Alert";

const Login = () => {
  const { setAuth } = useAuth();
  const usernameRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setAlert({ type: "", message: "" });
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setAlert({ type: "warning", message: "Please enter username or password" });
      errorRef.current.focus();
      return;
    }

    try {
      const response = await login(username, password);
      const accessToken = response?.data?.accessToken;

      setAuth({ username, accessToken });
      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setAlert({ type: "error", message: "No server response" });
      } else if (err.response?.status === 400) {
        setAlert({ type: "error", message: "These credentials do not match our records" });
      } else if (err.response?.status === 401) {
        setAlert({ type: "error", message: "Unauthorized" });
      } else {
        setAlert({ type: "error", message: "Login failed" });
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      <Layout>
        <div>
          <h1 className="text-3xl text-center text-slate-800 font-bold tracking-tight mb-8">Login</h1>
          {alert.message && (
            <Alert
              type={alert.type}
              message={alert.message}
            />
          )}
        </div>
        <form
          onSubmit={handleLogin}
          noValidate
        >
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
            autocomplete="off"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2">
            <Button>Login</Button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Login;
