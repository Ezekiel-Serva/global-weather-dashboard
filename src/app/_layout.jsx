import { Stack } from 'expo-router';
import { FavoritesProvider } from '../context/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="city/[id]" options={{ headerShown: true, title: 'Details' }} />
      </Stack>
    </FavoritesProvider>
  );
}

