import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useReducer } from "react";
import { authReducer, authInitialState } from "../reducer/authReducer";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    authInitialState,
    (initial) => {
      const saved = localStorage.getItem("auth");
      return saved ? JSON.parse(saved) : initial;
    }
  );

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    return {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      dispatch,
    };
  }, [state]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};