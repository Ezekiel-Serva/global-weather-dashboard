import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const light = {
  background: '#eaf6fd',
  card: '#ffffff',
  text: '#0f2a3d',
  subText: '#5b7b91',
  primary: '#38a9e8',
  onPrimary: '#ffffff',
  border: '#b9dff5',
  heart: '#e0245e',
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
  const [unit, setUnit] = useState('C')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem('settings')
        if (saved) {
          const s = JSON.parse(saved)
          if (typeof s.isDark === 'boolean') setIsDark(s.isDark)
          if (s.unit) setUnit(s.unit)
        }
      } catch (e) {}
      setLoaded(true)
    }
    load()
  }, [])

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem('settings', JSON.stringify({ isDark, unit })).catch(() => {})
    }
  }, [isDark, unit, loaded])

  const toggleTheme = () => setIsDark((prev) => !prev)
  const toggleUnit = () => setUnit((prev) => (prev === 'C' ? 'F' : 'C'))

  const formatTemp = (c) =>
    unit === 'C' ? `${c}°C` : `${Math.round((c * 9) / 5 + 32)}°F`

  const theme = isDark ? dark : light

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, toggleTheme, unit, toggleUnit, formatTemp }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)