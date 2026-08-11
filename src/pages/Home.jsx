import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import BookCard from "../components/BookCard";

// lista di libri finti solo per la parte decorativa in alto (hero)
// non c'entra niente con i dati veri che arrivano dal backend
const heroBooks = [
  { title: "The Long Way Home", color: "bg-spine-rust" },
  { title: "Whispers of the Forest", color: "bg-spine-moss" },
  { title: "Codebreakers", color: "bg-spine-teal" },
  { title: "The Last Lighthouse", color: "bg-spine-plum" },
  { title: "Midnight Garden", color: "bg-gold-dark" },
];

export default function Home() {
  // libri in evidenza presi dal backend
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // chiamo l'API per prendere solo i libri "featured"
    api
      .get("/books", { params: { featured: true, limit: 4 } })
      .then((res) => {
        setFeatured(res.data.books);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* sezione hero in alto, sfondo verde scuro */}
      <section className="relative overflow-hidden bg-ink text-parchment">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
              Now open
            </span>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-6xl">
              Books worth
              <br /> writing in the margins of.
            </h1>
            <p className="mt-6 max-w-md text-parchment/70">
              A small, opinionated shelf — new fiction, sharp non-fiction, and technical reads
              picked by people who actually finish what they buy.
            </p>
            <Link
              to="/shop"
              className="focus-ring mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-light"
            >
              Browse the shop
            </Link>
          </div>

          {/* mensola decorativa con libri finti, solo per far vedere qualcosa di carino */}
          <div className="hidden justify-self-end md:block">
            <div className="flex items-end gap-3">
              {heroBooks.map((book, index) => {
                // altezza un po' diversa per ogni libro, cosi non sono tutti uguali
                const bookHeight = 200 + (index % 3) * 30;
                return (
                  <div
                    key={book.title}
                    className={`flex w-10 items-end justify-center rounded-sm ${book.color} p-2 shadow-lg`}
                    style={{ height: bookHeight }}
                  >
                    <span className="text-[10px] font-semibold text-parchment/80 [writing-mode:vertical-rl]">
                      {book.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* sezione con i libri in evidenza presi dal backend */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold text-ink">Featured this week</h2>
          <Link to="/shop" className="focus-ring text-sm font-semibold text-ink/60 hover:text-ink">
            View all →
          </Link>
        </div>

        {/* mostro un messaggio diverso a seconda dello stato */}
        {loading && <p className="text-ink/50">Loading books…</p>}

        {!loading && featured.length === 0 && (
          <p className="text-ink/50">No featured books yet — run the seed script to add some.</p>
        )}

        {!loading && featured.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
