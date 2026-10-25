import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'



const TabsLayout = () => {
  const { theme } = useTheme()
  return (
    <Tabs  
      screenOptions={{   
      headerShown: true,
      headerStyle: { backgroundColor: theme.card },
      headerTintColor: theme.text,
      tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border },
      tabBarActiveTintColor: theme.primary,
      tabBarInactiveTintColor: theme.subText,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size}/>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="cloud" color={color} size={size}/>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size}/>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="settings" color={color} size={size}/>
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
