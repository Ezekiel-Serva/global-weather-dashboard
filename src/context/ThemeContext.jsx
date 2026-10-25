import React, { createContext, useContext, useState } from 'react'
import { useColorScheme } from 'react-native'

const light = {
  background: '#eaf6fd',
  card: '#ffffff',
  text: '#0f2a3d',
  subText: '#5b7b91',
  primary: '#38a9e8',
  border: '#b9dff5',
  heart: '#e0245e',
  onPrimary: '#ffffff',
}

const dark = {
  background: '#140b2e',
  card: '#231646',
  text: '#f0eaff',
  subText: '#a99bd1',
  primary: '#b79cff',
  onPrimary: '#140b2e',
  border: '#3a2a6b',
  heart: '#ff7eb6',
}

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const system = useColorScheme()
  const [isDark, setIsDark] = useState(system === 'dark')

  const toggleTheme = () => setIsDark((prev) => !prev)
  const theme = isDark ? dark : light

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)