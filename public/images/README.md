# Cartella immagini

**Aggiornamento**: da quando l'upload nella pagina Admin salva le immagini
direttamente dentro MongoDB (funziona sia in locale sia online, es. su
Vercel), non hai più bisogno di mettere manualmente file qui dentro per
usarli come copertine — basta scegliere la foto dal tuo computer nel form
"Add book", e viene salvata da sola.

Questa cartella resta utile solo se preferisci gestire a mano alcune
immagini statiche (es. loghi, immagini decorative non legate a un libro
specifico) invece di caricarle come copertina di un libro.

## Se comunque vuoi usarla

Tutto quello che c'è in `frontend/public/` viene servito automaticamente
da Vite alla radice del sito. Quindi un file qui dentro:

```
frontend/public/images/esempio.jpg
```

è raggiungibile all'indirizzo:

```
/images/esempio.jpg
```

Puoi incollare questo percorso (o un URL esterno completo) nel campo
"oppure incolla un URL immagine esterno" del form Admin, come alternativa
al caricamento diretto.
