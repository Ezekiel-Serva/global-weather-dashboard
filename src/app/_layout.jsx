import React from 'react'
import { Stack } from 'expo-router'
import { FavoritesProvider } from '../context/FavoritesContext'
import { ThemeProvider, useTheme } from '../context/ThemeContext'

const RootNavigator = () => {
   const { theme } = useTheme()

   return (
      <Stack
         screenOptions={{
            headerShown: false,
            animation: 'none',
            contentStyle: {
               backgroundColor: theme.background,
            },
         }}
      />
   )
}

const RootLayout = () => {
   return (
      <ThemeProvider>
         <FavoritesProvider>
            <RootNavigator />
         </FavoritesProvider>
      </ThemeProvider>
   )
}

export default RootLayout