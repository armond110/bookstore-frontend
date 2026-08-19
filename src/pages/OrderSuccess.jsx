import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

// pagina dove Stripe rimanda l'utente dopo un pagamento riuscito.
// Qui confermiamo col backend che il pagamento è vero, e SOLO a quel
// punto l'ordine viene creato davvero nel nostro database.
export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing payment session");
      setLoading(false);
      return;
    }

    api
      .get(`/payments/confirm/${sessionId}`)
      .then((res) => {
        setOrder(res.data.order);
        // pagamento confermato: adesso sì che possiamo svuotare il carrello
        clearCart();
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not confirm payment");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (loading) {
    return <p className="mx-auto max-w-xl px-4 py-20 text-center text-ink/50">Confirming your payment…</p>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Something went wrong</h1>
        <p className="mt-3 text-ink/50">{error}</p>
        <Link to="/cart" className="focus-ring mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink">
          Back to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Payment successful 🎉</h1>
      <p className="mt-3 text-ink/50">Thanks for your order — here's a quick summary.</p>

      {order && (
        <div className="mt-8 rounded-lg border border-ink/10 bg-white p-5 text-left shadow-sm">
          <ul className="space-y-1 text-sm text-ink/70">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-ink/10 pt-3 text-right font-display font-semibold text-ink">
            Total: ${order.totalAmount.toFixed(2)}
          </div>
        </div>
      )}

      <Link to="/orders" className="focus-ring mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink">
        View your orders
      </Link>
    </div>
  );
}
