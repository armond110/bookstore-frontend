import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CoverThumb from "../components/CoverThumb";

// pagina del carrello
export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // se il carrello è vuoto mostro un messaggio invece della lista
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Your cart is empty</h1>
        <p className="mt-3 text-ink/50">Find something worth marking up.</p>
        <Link
          to="/shop"
          className="focus-ring mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Your cart</h1>

      <div className="mt-8 divide-y divide-ink/10">
        {items.map((item) => (
          <div key={item.bookId} className="flex items-center gap-4 py-5">
            {/* mostro la copertina vera se c'è, altrimenti un blocco colorato di riserva */}
            <CoverThumb
              src={item.coverImage}
              alt={`Cover of ${item.title}`}
              className="h-20 w-14 shrink-0 rounded"
            />
            <div className="flex-1">
              <p className="font-display font-semibold text-ink">{item.title}</p>
              <p className="text-sm text-ink/50">{item.author}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.bookId, Number(e.target.value))}
              className="focus-ring w-16 rounded-full border border-ink/15 px-3 py-1 text-sm"
            />
            <span className="w-20 text-right font-semibold text-ink">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCart(item.bookId)}
              className="focus-ring text-ink/40 hover:text-spine-rust"
              aria-label={`Remove ${item.title}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
        <span className="font-display text-xl font-semibold text-ink">
          Total: ${total.toFixed(2)}
        </span>
        {/* se l'utente non è loggato lo mando prima al login, altrimenti al checkout */}
        <button
          onClick={() => navigate(user ? "/checkout" : "/login")}
          className="focus-ring rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink"
        >
          {user ? "Checkout" : "Sign in to checkout"}
        </button>
      </div>
    </div>
  );
}
