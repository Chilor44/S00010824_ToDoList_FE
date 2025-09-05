import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children, role }) {
  const auth = useSelector((s) => s.auth);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (role && auth.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
}
