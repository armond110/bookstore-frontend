import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// questo componente blocca l'accesso alla pagina se l'utente non è loggato
// (o non è admin, se adminOnly è true)
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  // mentre controllo se l'utente è loggato, mostro un messaggio di caricamento
  if (loading) {
    return <div className="p-10 text-center text-ink/50">Loading…</div>;
  }

  // se non c'è utente, lo mando alla pagina di login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // se la pagina è solo per admin e l'utente non lo è, lo mando alla home
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
