import React, { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (city) => {
    setFavorites((prev) =>
      prev.some((c) => c.city === city.city)
        ? prev.filter((c) => c.city !== city.city)
        : [...prev, city]
    )
  }

  const isFavorite = (name) => favorites.some((c) => c.city === name)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)