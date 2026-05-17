import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-green-900 mb-2 text-center">
          Create Account
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Start generating smart QR codes
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-green-300 rounded-xl p-4 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={registerUser}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg"
        >
          Register
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-green-700 font-bold ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;