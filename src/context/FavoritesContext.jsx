import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (id) => favorites.some((c) => c.id === id);

  const toggleFavorite = (city) => {
    setFavorites((prev) =>
      prev.some((c) => c.id === city.id)
        ? prev.filter((c) => c.id !== city.id)
        : [...prev, city]
    );
  };

  const clearFavorites = () => setFavorites([]);

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, clearFavorites, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

