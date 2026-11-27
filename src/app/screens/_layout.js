import { Stack } from 'expo-router'
import { View } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function ScreensLayout() {
   const { theme } = useTheme()

   return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
         <Stack
            screenOptions={{
               animation: 'none',
               headerStyle: { backgroundColor: theme.primary },
               headerTintColor: theme.onPrimary,
               headerTitleStyle: { fontWeight: '700' },
               contentStyle: { backgroundColor: theme.background }
            }}
         >

            <Stack.Screen
               name="contactsScreen"
               options={{ title: 'Contact Me' }}
            />

            <Stack.Screen
               name="aboutScreen"
               options={{ title: 'About Me' }}
            />

         </Stack>
      </View>
   )
}