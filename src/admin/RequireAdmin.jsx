import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";

function RequireAdmin() {
  const { isAdminAuthenticated } = useAdminAuth();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default RequireAdmin;