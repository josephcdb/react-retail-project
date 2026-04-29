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
    <div className="p-6">
      <input
        className="border p-2"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
      >
        Login
      </button>
    </div>
  );
}