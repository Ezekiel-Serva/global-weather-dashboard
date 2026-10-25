import React from 'react'
import { Stack } from 'expo-router'
import { FavoritesProvider } from '../context/FavoritesContext'
import { ThemeProvider } from '../context/ThemeContext'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default RootLayout