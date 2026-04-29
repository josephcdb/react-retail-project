export const authInitialState = {
  isAuthenticated: false,
  user: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
}