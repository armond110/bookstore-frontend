import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  // dati utente e carrello presi dai context
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  // testo scritto nella barra di ricerca
  const [query, setQuery] = useState("");

  // true quando il menu mobile (hamburger) è aperto
  const [mobileOpen, setMobileOpen] = useState(false);

  // quando l'utente cerca qualcosa, lo mando alla pagina shop con il parametro search
  function handleSearch(e) {
    e.preventDefault();
    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/shop");
    }
    setMobileOpen(false);
  }

  // chiudo il menu mobile ogni volta che l'utente clicca un link
  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-ink text-parchment shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <Link to="/" className="shrink-0 font-display text-2xl font-semibold tracking-tight" onClick={closeMobileMenu}>
          Marginalia
        </Link>

        {/* barra di ricerca, visibile solo da schermo medio in su */}
        <form onSubmit={handleSearch} className="hidden flex-1 md:flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, genre…"
            className="focus-ring w-full rounded-l-full border border-ink-light bg-ink-light px-4 py-2 text-sm text-parchment placeholder:text-parchment/50"
          />
          <button
            type="submit"
            className="focus-ring rounded-r-full bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-light"
          >
            Search
          </button>
        </form>

        {/* menu normale, visibile solo da schermo medio in su */}
        <nav className="ml-auto hidden items-center gap-5 text-sm md:flex">
          <Link to="/shop" className="hover:text-gold-light">
            Shop
          </Link>
          <Link to="/cart" className="relative hover:text-gold-light">
            Cart
            {/* mostro il numero solo se c'è almeno un libro nel carrello */}
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>
          {/* se l'utente è loggato mostro ordini/admin/logout, altrimenti mostro sign in */}
          {user ? (
            <>
              <Link to="/orders" className="hover:text-gold-light">
                Orders
              </Link>
              {/* il link admin si vede solo se il ruolo è admin */}
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-gold-light">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="focus-ring hover:text-gold-light">
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className="focus-ring hover:text-gold-light">
              Sign in
            </Link>
          )}
        </nav>

        {/* bottone hamburger, visibile solo sotto lo schermo medio */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="focus-ring ml-auto flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            // icona "X" quando il menu è aperto
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // icona hamburger (tre righe) quando il menu è chiuso
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* pannello del menu mobile, si vede solo quando mobileOpen è true */}
      {mobileOpen && (
        <div className="border-t border-parchment/10 px-4 pb-4 md:hidden">
          {/* barra di ricerca dentro il menu mobile */}
          <form onSubmit={handleSearch} className="mt-4 flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, author, genre…"
              className="focus-ring w-full rounded-l-full border border-ink-light bg-ink-light px-4 py-2 text-sm text-parchment placeholder:text-parchment/50"
            />
            <button
              type="submit"
              className="focus-ring rounded-r-full bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-light"
            >
              Search
            </button>
          </form>

          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/shop" onClick={closeMobileMenu} className="hover:text-gold-light">
              Shop
            </Link>
            <Link to="/cart" onClick={closeMobileMenu} className="hover:text-gold-light">
              Cart {count > 0 && `(${count})`}
            </Link>
            {user ? (
              <>
                <Link to="/orders" onClick={closeMobileMenu} className="hover:text-gold-light">
                  Orders
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" onClick={closeMobileMenu} className="hover:text-gold-light">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="focus-ring text-left hover:text-gold-light"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMobileMenu} className="focus-ring hover:text-gold-light">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
