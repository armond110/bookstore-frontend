import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import BookCard from "../components/BookCard";

// pagina che mostra tutti i libri, con filtri per genere, ordinamento e ricerca
export default function Shop() {
  // parametri letti dall'url (es. ?genre=Fiction&sort=price_asc)
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "newest";

  // prendo la lista dei generi una sola volta all'avvio, serve per il menu a tendina
  useEffect(() => {
    api.get("/books/genres").then((res) => setGenres(res.data.genres));
  }, []);

  // ogni volta che cambia un filtro (ricerca, genere, ordine, pagina) rifaccio la chiamata
  useEffect(() => {
    setLoading(true);
    api
      .get("/books", { params: { search, genre, sort, page, limit: 8 } })
      .then((res) => {
        setBooks(res.data.books);
        setPages(res.data.pages);
      })
      .finally(() => setLoading(false));
  }, [search, genre, sort, page]);

  // aggiorna un filtro nell'url e torna alla pagina 1
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Shop the shelf</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={genre}
          onChange={(e) => updateParam("genre", e.target.value)}
          className="focus-ring rounded-full border border-ink/15 bg-white px-4 py-2 text-sm"
        >
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="focus-ring rounded-full border border-ink/15 bg-white px-4 py-2 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>

        {search && (
          <span className="flex items-center gap-2 rounded-full bg-ink/5 px-4 py-2 text-sm">
            "{search}"
            <button onClick={() => updateParam("search", "")} className="text-ink/50 hover:text-ink">
              ✕
            </button>
          </span>
        )}
      </div>

      {loading ? (
        <p className="mt-10 text-ink/50">Loading books…</p>
      ) : books.length === 0 ? (
        <p className="mt-10 text-ink/50">No books match those filters.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`focus-ring h-9 w-9 rounded-full text-sm font-semibold ${
                p === page ? "bg-ink text-parchment" : "bg-white text-ink/60 hover:bg-ink/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
