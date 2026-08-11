import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

// pagina di dettaglio di un singolo libro
export default function BookDetail() {
  // id del libro preso dall'url, tipo /books/12345
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false); // per mostrare "Added" quando clicco il bottone
  const [imageFailed, setImageFailed] = useState(false); // true se il link dell'immagine non carica
  const { addToCart } = useCart();

  // ogni volta che cambia l'id nell'url, ricarico i dati del libro
  useEffect(() => {
    api.get(`/books/${id}`).then((res) => setBook(res.data.book));
  }, [id]);

  if (!book) return <p className="mx-auto max-w-4xl px-4 py-16 text-ink/50">Loading…</p>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/shop" className="focus-ring text-sm text-ink/50 hover:text-ink">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[220px_1fr]">
        {/* immagine di copertina, se c'è e si carica; altrimenti un blocco colorato di riserva */}
        {book.coverImage && !imageFailed ? (
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="h-80 w-full rounded-lg object-cover shadow-lg md:h-full"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-80 w-full items-center justify-center rounded-lg bg-ink-light p-4 shadow-lg md:h-full">
            <span className="text-center font-display text-sm text-parchment/70">
              {book.title}
            </span>
          </div>
        )}

        <div>
          <span className="inline-block rounded-full bg-parchment px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink/60">
            {book.genre}
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink">{book.title}</h1>
          <p className="mt-1 text-ink/60">by {book.author}</p>
          <p className="mt-6 leading-relaxed text-ink/70">{book.description}</p>

          <div className="mt-8 flex items-center gap-6">
            <span className="font-display text-3xl font-semibold text-ink">
              ${book.price.toFixed(2)}
            </span>
            <span className="text-sm text-ink/50">
              {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="number"
              min="1"
              max={book.stock}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="focus-ring w-20 rounded-full border border-ink/15 px-4 py-2 text-sm"
            />
            <button
              onClick={() => {
                addToCart(book, qty);
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              disabled={book.stock === 0}
              className="focus-ring rounded-full bg-ink px-6 py-2 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink disabled:opacity-40"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
