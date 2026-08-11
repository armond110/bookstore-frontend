import { Link } from "react-router-dom";

// pagina 404, si vede quando l'url non corrisponde a nessuna rotta
export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="font-display text-6xl font-semibold text-ink">404</p>
      <p className="mt-4 text-ink/50">This page fell out of the book.</p>
      <Link
        to="/"
        className="focus-ring mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink"
      >
        Back to the shelf
      </Link>
    </div>
  );
}
