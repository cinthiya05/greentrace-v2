import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/api/login", formData);
      if (res.data && res.data.token) {
        localStorage.setItem("user_id", res.data.user_id);
        navigate("/dashboard");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          GreenTrace Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-green-700 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

