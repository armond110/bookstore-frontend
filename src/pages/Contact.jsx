// pagina statica con i contatti
export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Contact</h1>
      <div className="mt-6 space-y-4 text-ink/70">
        <p>Questions about an order, a book, or anything else? Reach out any time.</p>
        <p>
          Email:{" "}
          <a href="mailto:hello@marginalia-books.example" className="focus-ring font-semibold text-ink hover:text-gold-dark">
            hello@marginalia-books.example
          </a>
        </p>
        <p className="text-sm text-ink/50">
          This is a demo store, so this address isn't monitored — swap it for your real contact
          info when you're ready to launch.
        </p>
      </div>
    </div>
  );
}
