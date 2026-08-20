import { useEffect, useState } from "react";
import api from "../api/axios";
import CoverThumb from "../components/CoverThumb";

const EMPTY_FORM = {
  title: "",
  author: "",
  description: "",
  price: "",
  genre: "",
  stock: "",
  coverImage: "",
  featured: false,
};

// pagina admin per aggiungere, modificare e cancellare libri
// si può aprire solo se sei loggato come admin (controllato da ProtectedRoute)
export default function Admin() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null); // se non è null, sto modificando quel libro
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // true mentre carico un'immagine

  // ricarica la lista libri dal backend
  function loadBooks() {
    setLoading(true);
    api
      .get("/books", { params: { limit: 50 } })
      .then((res) => setBooks(res.data.books))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadBooks();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  // quando l'utente sceglie un file dal computer, lo mando subito al backend
  // che lo salva dentro frontend/public/images e ci restituisce il percorso
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({ ...prev, coverImage: res.data.url }));
    } catch (err) {
      setError(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input, così posso ricaricare lo stesso file se serve
    }
  }

  function startEdit(book) {
    setEditingId(book._id);
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      genre: book.genre,
      stock: book.stock,
      coverImage: book.coverImage || "",
      featured: book.featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  // salva il libro: se sto modificando faccio update, altrimenti creo uno nuovo
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, payload);
      } else {
        await api.post("/books", payload);
      }
      resetForm();
      loadBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save book");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this book?")) return;
    await api.delete(`/books/${id}`);
    loadBooks();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Admin · Manage books</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-lg border border-ink/10 bg-white p-6 shadow-sm md:grid-cols-2">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="focus-ring rounded-lg border border-ink/15 px-4 py-2 text-sm" />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required className="focus-ring rounded-lg border border-ink/15 px-4 py-2 text-sm" />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required className="focus-ring rounded-lg border border-ink/15 px-4 py-2 text-sm" />
        <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required className="focus-ring rounded-lg border border-ink/15 px-4 py-2 text-sm" />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required className="focus-ring rounded-lg border border-ink/15 px-4 py-2 text-sm" />
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-ink/70">Cover image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp, image/gif"
            onChange={handleImageUpload}
            disabled={uploading}
            className="focus-ring w-full rounded-lg border border-ink/15 px-4 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-parchment"
          />
          <p className="mt-1 text-xs text-ink/40">
            Scegli una foto dal tuo computer (max 2MB): viene salvata direttamente nel database,
            funziona sia in locale sia online. Immagini più piccole rendono il sito più veloce.
          </p>

          {/* campo alternativo: URL esterno, se preferisci non caricare il file */}
          <input
            type="text"
            name="coverImage"
            placeholder="oppure incolla un URL immagine esterno (https://...)"
            value={form.coverImage}
            onChange={handleChange}
            className="focus-ring mt-2 w-full rounded-lg border border-ink/15 px-4 py-2 text-sm"
          />

          {uploading && <p className="mt-1 text-xs text-ink/50">Caricamento in corso…</p>}
          {/* anteprima, si vede solo se c'è già un'immagine caricata o scelta prima */}
          {form.coverImage && !uploading && (
            <CoverThumb src={form.coverImage} alt="Anteprima copertina" className="mt-2 h-24 w-16 rounded" />
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Featured
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="focus-ring rounded-lg border border-ink/15 px-4 py-2 text-sm md:col-span-2"
        />

        {error && <p className="text-sm text-spine-rust md:col-span-2">{error}</p>}

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={uploading}
            className="focus-ring rounded-full bg-ink px-6 py-2 text-sm font-semibold text-parchment hover:bg-gold hover:text-ink disabled:opacity-50"
          >
            {editingId ? "Update book" : "Add book"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="focus-ring rounded-full border border-ink/20 px-6 py-2 text-sm font-semibold text-ink/70 hover:bg-ink/5">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        {loading ? (
          <p className="text-ink/50">Loading books…</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-ink/10 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/10 bg-parchment/50 text-ink/60">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Genre</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {books.map((book) => (
                  <tr key={book._id}>
                    <td className="px-4 py-3">
                      <CoverThumb src={book.coverImage} alt="" className="h-12 w-9 rounded" />
                    </td>
                    <td className="px-4 py-3 font-medium text-ink">{book.title}</td>
                    <td className="px-4 py-3 text-ink/60">{book.genre}</td>
                    <td className="px-4 py-3 text-ink/60">${book.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-ink/60">{book.stock}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => startEdit(book)} className="focus-ring mr-3 text-ink/60 hover:text-ink">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(book._id)} className="focus-ring text-spine-rust hover:text-spine-rust/70">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
