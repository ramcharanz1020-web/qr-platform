import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-green-900 mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-8">Start generating smart QR codes</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name"
            className="w-full border border-green-300 rounded-xl p-4 mb-4"
            onChange={handleChange} />
          <input type="email" name="email" placeholder="Email"
            className="w-full border border-green-300 rounded-xl p-4 mb-4"
            onChange={handleChange} />
          <input type="password" name="password" placeholder="Password"
            className="w-full border border-green-300 rounded-xl p-4 mb-6"
            onChange={handleChange} />
          <button type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg">
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-green-700 font-bold ml-2">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;