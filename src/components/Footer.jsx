import { Link } from "react-router-dom";

// footer semplice, sempre uguale in tutte le pagine
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-ink text-parchment/70">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <p className="font-display text-lg text-parchment">Marginalia</p>
            <p className="mt-1 max-w-xs text-parchment/60">
              A small shop for books worth writing in the margins of.
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="mb-2 font-semibold text-parchment">Shop</p>
              {/* ogni link porta allo shop già filtrato per quel genere */}
              <Link to="/shop?genre=Fiction" className="focus-ring block py-0.5 hover:text-gold-light">
                Fiction
              </Link>
              <Link to="/shop?genre=Non-Fiction" className="focus-ring block py-0.5 hover:text-gold-light">
                Non-Fiction
              </Link>
              <Link to="/shop?genre=Science Fiction" className="focus-ring block py-0.5 hover:text-gold-light">
                Science Fiction
              </Link>
            </div>
            <div>
              <p className="mb-2 font-semibold text-parchment">Store</p>
              <Link to="/shipping" className="focus-ring block py-0.5 hover:text-gold-light">
                Shipping
              </Link>
              <Link to="/returns" className="focus-ring block py-0.5 hover:text-gold-light">
                Returns
              </Link>
              <Link to="/contact" className="focus-ring block py-0.5 hover:text-gold-light">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-parchment/10 pt-6 text-xs text-parchment/40">
          © {new Date().getFullYear()} Marginalia Books. Built with React, Tailwind, Express &amp; MongoDB.
        </p>
      </div>
    </footer>
  );
}
