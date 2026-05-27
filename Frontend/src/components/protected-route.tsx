import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const { token } =
    useAuth();

  // NOT LOGGED IN
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // LOGGED IN
  return children;
}