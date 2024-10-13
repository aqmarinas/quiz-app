import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fungsi untuk menangani login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Panggil API login menggunakan axios
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Jika login berhasil, simpan token (misalnya di localStorage atau context)
      localStorage.setItem("token", response.data.token);

      // Redirect user atau lakukan sesuatu setelah login sukses
      console.log("Login berhasil!", response.data);
    } catch (err) {
      // Jika terjadi kesalahan, tampilkan pesan error
      console.log(err);
      setError("Login gagal, cek kembali email atau password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
