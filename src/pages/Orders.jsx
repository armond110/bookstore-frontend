import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUS_COLOR = {
  pending: "bg-gold/20 text-gold-dark",
  paid: "bg-spine-teal/20 text-spine-teal",
  shipped: "bg-spine-plum/20 text-spine-plum",
  delivered: "bg-spine-moss/20 text-spine-moss",
  cancelled: "bg-spine-rust/20 text-spine-rust",
};

// pagina con lo storico ordini dell'utente loggato
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // prendo solo gli ordini dell'utente che ha fatto login (grazie al token)
  useEffect(() => {
    api
      .get("/orders/mine")
      .then((res) => setOrders(res.data.orders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="mx-auto max-w-3xl px-4 py-16 text-ink/50">Loading orders…</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Your orders</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-ink/50">No orders yet.</p>
      ) : (
        <div className="mt-8 space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/50">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_COLOR[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-ink/70">
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
          ))}
        </div>
      )}
    </div>
  );
}
