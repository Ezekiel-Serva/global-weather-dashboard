import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function CityCard({ city, onPress }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(city.id);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Pressable
        hitSlop={10}
        onPress={() => toggleFavorite(city)}
        style={styles.heartButton}
      >
        <Ionicons
          name={favorited ? 'heart' : 'heart-outline'}
          size={22}
          color={favorited ? '#e0433c' : '#999'}
        />
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.name}>{city.name}</Text>
        <Text style={styles.country}>{city.country}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.temp}>{city.tempC}°C</Text>
        <Text style={styles.condition}>{city.condition}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f5f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  heartButton: { marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: '600' },
  country: { fontSize: 13, color: '#666' },
  right: { alignItems: 'flex-end' },
  temp: { fontSize: 22, fontWeight: '700' },
  condition: { fontSize: 13, color: '#666' },
});

