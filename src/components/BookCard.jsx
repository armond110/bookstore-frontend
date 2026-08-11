import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

// mappa genere -> colore della costina del libro (tutti verdi ora)
const SPINE_COLORS = {
  Fiction: "bg-spine-rust",
  "Non-Fiction": "bg-spine-moss",
  "Science Fiction": "bg-spine-teal",
  Technology: "bg-spine-plum",
  Cooking: "bg-gold-dark",
};

// se il genere non è nella mappa, uso un verde di default
function spineColor(genre) {
  return SPINE_COLORS[genre] || "bg-ink-light";
}

export default function BookCard({ book }) {
  // prendo la funzione per aggiungere al carrello dal context
  const { addToCart } = useCart();

  // true se l'immagine non è impostata OPPURE se ha provato a caricarsi ed è fallita
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(book.coverImage) && !imageFailed;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <span className={`absolute left-0 top-0 z-10 h-full w-1.5 ${spineColor(book.genre)}`} />

      <Link to={`/books/${book._id}`} className="focus-ring block">
        {showImage ? (
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="h-56 w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className={`flex h-56 w-full items-center justify-center ${spineColor(book.genre)}`}>
            <span className="px-4 text-center font-display text-sm text-parchment/80">
              {book.title}
            </span>
          </div>
        )}
      </Link>

      <Link to={`/books/${book._id}`} className="focus-ring flex flex-1 flex-col p-4 pl-5">
        <span className="mb-1.5 inline-block w-fit rounded-full bg-parchment px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink/60">
          {book.genre}
        </span>
        <h3 className="font-display text-base font-semibold leading-snug text-ink">{book.title}</h3>
        <p className="mt-0.5 text-xs text-ink/60">{book.author}</p>
        <p className="mt-2 line-clamp-2 text-xs text-ink/50">{book.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-base font-semibold text-ink">
            ${book.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-ink/40">
            {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </Link>
      {/* bottone per aggiungere 1 copia del libro al carrello */}
      <button
        onClick={() => addToCart(book, 1)}
        disabled={book.stock === 0}
        className="focus-ring m-4 mt-0 rounded-full bg-ink py-1.5 text-xs font-semibold text-parchment transition hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add to cart
      </button>
    </div>
  );
}
