import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { login } from "../../services/api";
import Layout from "@/components/layouts/Layout";

const Login = () => {
  const { setAuth } = useAuth();
  const usernameRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Please fill in all fields");
      errorRef.current.focus();
      return;
    }

    try {
      const response = await login(username, password);
      console.log({ response });
      const accessToken = response?.data?.accessToken;

      setAuth({ username, accessToken });
      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("No server response");
      } else if (err.response?.status === 400) {
        setErrorMessage("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {/* !! ADD ALERT */}
      <Layout>
        <div>
          <p
            ref={errorRef}
            className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
        </div>
        <div>
          <h1 className="text-3xl text-center text-slate-800 font-bold tracking-tight mb-8">Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <Input
            label="Username"
            type="text"
            id="username"
            name="username"
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autocomplete="off"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
