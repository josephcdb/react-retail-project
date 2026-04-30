import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export function LoginPage() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [name, setName] = useState("");

  function handleLogin() {
    if (!name.trim()) return;

    dispatch({
      type: "LOGIN",
      payload: { name },
    });

    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border rounded-xl shadow-sm p-6 space-y-4">

        <h1 className="text-xl font-semibold text-center">
          Welcome to Joseph Retail Page
        </h1>

        <input
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={!name.trim()}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        > Login
        </button>

        <button
          onClick={handleClear}
          disabled={!name.trim()}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        > Clear
        </button>
      </div>
    </div>
  );
}