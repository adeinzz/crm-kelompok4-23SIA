import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}
