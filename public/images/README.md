# Cartella immagini

Metti qui dentro le copertine dei libri (es. `il-mio-libro.jpg`).

Tutto quello che c'è in `frontend/public/` viene servito automaticamente
da Vite alla radice del sito. Quindi se metti un file qui:

```
frontend/public/images/il-mio-libro.jpg
```

lo puoi richiamare nel form "Aggiungi libro" (pagina /admin) scrivendo
nel campo "Cover Image URL" semplicemente:

```
/images/il-mio-libro.jpg
```

(con lo slash all'inizio, senza "frontend/public").

## Note

- Formati consigliati: .jpg, .png, .webp
- Dimensione consigliata: circa 400x600px (proporzione verticale, come una copertina)
- Se non metti nessuna immagine, il libro mostra automaticamente un blocco
  colorato al posto della copertina — non è un errore, è il comportamento
  di fallback.
- Quando fai la build (`npm run build`), questa cartella viene copiata così
  com'è dentro `dist/`, quindi le immagini restano disponibili anche in produzione.
- Se invece preferisci usare immagini già online (es. da un altro sito),
  puoi incollare direttamente l'URL completo (https://...) nello stesso campo,
  senza bisogno di mettere il file qui dentro.
