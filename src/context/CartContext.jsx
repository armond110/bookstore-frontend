import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "bookstore_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(book, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.bookId === book._id);
      if (existing) {
        return prev.map((i) =>
          i.bookId === book._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          bookId: book._id,
          title: book.title,
          author: book.author,
          price: book.price,
          coverImage: book.coverImage,
          quantity,
        },
      ];
    });
  }

  function updateQuantity(bookId, quantity) {
    if (quantity <= 0) return removeFromCart(bookId);
    setItems((prev) => prev.map((i) => (i.bookId === bookId ? { ...i, quantity } : i)));
  }

  function removeFromCart(bookId) {
    setItems((prev) => prev.filter((i) => i.bookId !== bookId));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
