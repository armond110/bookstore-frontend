import { useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

// pagina di checkout: l'utente mette l'indirizzo, poi viene mandato
// alla pagina di pagamento di Stripe per pagare davvero con carta
export default function Checkout() {
  const { items, total } = useCart();

  // dati del form dell'indirizzo di spedizione
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false); // true mentre preparo il pagamento

  // aggiorna il campo del form che l'utente sta scrivendo
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // chiedo al backend di creare una sessione di pagamento Stripe,
  // poi mando il browser direttamente sulla pagina di Stripe per pagare
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setRedirecting(true);
    try {
      const res = await api.post("/payments/create-checkout-session", {
        items: items.map((i) => ({ bookId: i.bookId, quantity: i.quantity })),
        shippingAddress: form,
      });
      // il carrello NON lo svuoto qui: lo svuoto solo dopo che Stripe
      // conferma che il pagamento è andato davvero a buon fine
      window.location.href = res.data.url;
    } catch (err) {
      setError(err.response?.data?.message || "Could not start checkout");
      setRedirecting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Checkout</h1>
      <p className="mt-2 text-sm text-ink/50">
        Dopo aver inserito l'indirizzo, verrai portato alla pagina di pagamento sicura di Stripe.
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
            disabled={redirecting}
            className="focus-ring rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink disabled:opacity-50"
          >
            {redirecting ? "Reindirizzamento…" : "Pay with card"}
          </button>
        </div>
      </form>
    </div>
  );
}
