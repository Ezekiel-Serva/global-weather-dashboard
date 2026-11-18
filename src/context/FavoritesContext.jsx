import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { refreshWeather } from '../services/weatherApi'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem('favorites')
        if (saved) setFavorites(JSON.parse(saved))
      } catch (e) {}
      setLoaded(true)
    }
    load()
  }, [])

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem('favorites', JSON.stringify(favorites)).catch(() => {})
    }
  }, [favorites, loaded])

  const toggleFavorite = (city) => {
    setFavorites((prev) =>
      prev.some((c) => c.id === city.id)
        ? prev.filter((c) => c.id !== city.id)
        : [...prev, city]
    )
  }

  const isFavorite = (id) => favorites.some((c) => c.id === id)

  const refreshFavorites = async () => {
    setRefreshing(true)
    const updated = await Promise.all(
      favorites.map(async (c) => {
        try {
          return await refreshWeather(c)
        } catch (e) {
          return c // keep the old data if this city fails
        }
      })
    )
    setFavorites(updated)
    setRefreshing(false)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, refreshFavorites, refreshing }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)