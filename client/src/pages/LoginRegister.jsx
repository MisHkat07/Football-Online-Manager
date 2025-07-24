import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   try {
     const res = await axios.post(
       `http://localhost:5000/api/auth`,
       { email, password },
       { withCredentials: true }
     );
     if (res.data.token) {
       localStorage.setItem("token", res.data.token);
       navigate("/");
     } else {
       alert("No token received from server.");
     }
   } catch (err) {
     alert(err.response?.data?.message || "Login failed.");
   }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white glass-card p-6 rounded shadow-md w-full max-w-md">
        <h1 className=" text-center text-2xl font-bold mb-4">
          Football Online <span className="text-blue-600">Manager</span>
        </h1>
        <p className="text-md font-semibold mb-4 text-center">
          Login / Register
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 glass-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 px-4 py-2 border rounded glass-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
