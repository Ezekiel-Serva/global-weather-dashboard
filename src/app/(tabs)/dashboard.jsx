import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CityCard from '../../components/CityCard';
import { FAKE_CITIES } from '../../types/weather';

export default function DashboardScreen() {
  const { city } = useLocalSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');
  // Stub: recent/current results start as fake data.
  // Replace with real API results once weatherApi.js is wired in.
  const [results, setResults] = useState(FAKE_CITIES);

  useEffect(() => {
    if (city) {
      // TODO: replace with real API fetch by city name
      console.log('Searched from Home:', city);
    }
  }, [city]);

  const handleSearch = () => {
    if (!query.trim()) return;
    // TODO: fetch real weather for `query` and prepend to results
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search another city..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Go</Text>
        </Pressable>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CityCard city={item} onPress={() => router.push(`/city/${item.id}`)} />
        )}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700' },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2b7fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

