import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// pagina di login
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // provo a fare login, se va bene mando l'utente alla home
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">Sign in</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus-ring w-full rounded-lg border border-ink/15 px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/70">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus-ring w-full rounded-lg border border-ink/15 px-4 py-2 text-sm"
          />
        </div>

        {error && <p className="text-sm text-spine-rust">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring w-full rounded-full bg-ink py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/50">
        No account?{" "}
        <Link to="/register" className="focus-ring font-semibold text-ink hover:text-gold-dark">
          Register
        </Link>
      </p>
    </div>
  );
}
