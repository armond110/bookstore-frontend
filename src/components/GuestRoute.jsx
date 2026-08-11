import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// il contrario di ProtectedRoute: questa è per pagine che hanno senso
// SOLO se non sei loggato, tipo login e register.
// Se un utente già loggato prova ad andarci, lo rimando alla home.
export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center text-ink/50">Loading…</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
