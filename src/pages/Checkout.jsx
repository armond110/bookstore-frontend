import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

// pagina di checkout, qui l'utente mette l'indirizzo e conferma l'ordine
// (è un checkout finto, non c'è nessun pagamento vero)
export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  // dati del form dell'indirizzo di spedizione
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false); // true mentre sto inviando l'ordine

  // aggiorna il campo del form che l'utente sta scrivendo
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // invia l'ordine al backend
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      await api.post("/orders", {
        items: items.map((i) => ({ bookId: i.bookId, quantity: i.quantity })),
        shippingAddress: form,
      });
      // ordine creato, svuoto il carrello e vado alla pagina ordini
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Checkout</h1>
      <p className="mt-2 text-sm text-ink/50">
        This is a demo checkout — no real payment is processed.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {["fullName", "street", "city", "postalCode", "country"].map((field) => (
          <div key={field}>
            <label className="mb-1 block text-sm font-medium capitalize text-ink/70">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="focus-ring w-full rounded-lg border border-ink/15 px-4 py-2 text-sm"
            />
          </div>
        ))}

        {error && <p className="text-sm text-spine-rust">{error}</p>}

        <div className="flex items-center justify-between border-t border-ink/10 pt-6">
          <span className="font-display text-xl font-semibold text-ink">
            Total: ${total.toFixed(2)}
          </span>
          <button
            type="submit"
            disabled={placing}
            className="focus-ring rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink disabled:opacity-50"
          >
            {placing ? "Placing order…" : "Place order"}
          </button>
        </div>
      </form>
    </div>
  );
}
