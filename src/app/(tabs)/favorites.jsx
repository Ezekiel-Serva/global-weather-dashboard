import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CityCard from '../../components/CityCard';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, clearFavorites } = useFavorites();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Favorites</Text>
        {favorites.length > 0 && (
          <Pressable onPress={clearFavorites}>
            <Text style={styles.clearText}>Clear All</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No favorites yet — tap the heart on a city to save it.</Text>
        }
        renderItem={({ item }) => (
          <CityCard city={item} onPress={() => router.push(`/city/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: '700' },
  clearText: { color: '#e0433c', fontWeight: '600' },
  empty: { color: '#888', textAlign: 'center', marginTop: 40 },
});

