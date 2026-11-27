import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'

{/*Layout for the Home, Dash, Fav, Settings*/ }

const TabsLayout = () => {

   {/*Theme for Dark/Light*/ }
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
            sceneStyle: {
               backgroundColor: theme.background,
            },
         }}
      >

         {/*Home*/}
         <Tabs.Screen
            name="index"
            options={{
               title: 'Home',
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
               ),
            }}
         />

         {/*Dashboard*/}
         <Tabs.Screen
            name="dashboard"
            options={{
               title: 'Dashboard',
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cloud" color={color} size={size} />
               ),
            }}
         />

         {/*Favs*/}
         <Tabs.Screen
            name="favorites"
            options={{
               title: 'Favorites',
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="heart" color={color} size={size} />
               ),
            }}
         />

         {/*Settings*/}
         <Tabs.Screen
            name="settings"
            options={{
               title: 'Settings',
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={size} />
               ),
            }}
         />
      </Tabs>
   )
}

export default TabsLayout
