import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-green-900 mb-2 text-center">
          Welcome Back
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-green-300 rounded-xl p-4 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-green-300 rounded-xl p-4 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don&apos;t have an account?
          <Link to="/register" className="text-green-700 font-bold ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
