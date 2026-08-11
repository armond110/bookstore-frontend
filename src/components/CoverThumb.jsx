import { useState } from "react";

// mostra l'immagine di copertina; se manca o se il caricamento fallisce
// (link rotto, file non trovato) mostra un blocco colorato al suo posto
export default function CoverThumb({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className={`${className} bg-ink-light`} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover`}
      onError={() => setFailed(true)}
    />
  );
}
