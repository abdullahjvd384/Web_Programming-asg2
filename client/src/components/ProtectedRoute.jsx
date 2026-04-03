import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
