import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import type { ReactNode } from "react";

export function ProtectedRoute({ children, requiredRole }: { children: ReactNode; requiredRole?: string }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && requiredRole !== user.tipoUsuario) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
