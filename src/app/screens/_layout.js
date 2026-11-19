import { Stack } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'

export default function ScreensLayout(){
  const { theme } = useTheme()
  
  return(
    <Stack 
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        headerTintColor: theme.onPrimary,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: theme.background }
      }}
    >

      <Stack.Screen 
        name="contactsScreen"
        options={{ title: 'Contact Me'}}
      />
      
      <Stack.Screen 
        name="aboutScreen"
        options={{ title: 'About Me'}}
      />

    </Stack>
  )
}