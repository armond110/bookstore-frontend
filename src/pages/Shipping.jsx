// pagina statica con le info di spedizione
export default function Shipping() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Shipping</h1>
      <div className="mt-6 space-y-4 text-ink/70">
        <p>
          Orders are packed and shipped within 1-2 business days. Once shipped, you'll receive a
          confirmation with your order status on the "Your orders" page.
        </p>
        <p>
          Standard shipping usually takes 3-5 business days. Express options are shown at checkout
          if available for your address.
        </p>
        <p>
          This is a demo store, so no real packages are shipped — but this is where a real shipping
          policy would go.
        </p>
      </div>
    </div>
  );
}
