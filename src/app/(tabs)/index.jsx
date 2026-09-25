import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    // Passing the searched city name to Dashboard via route params
    router.push({ pathname: '/dashboard', params: { city: query.trim() } });
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Weather</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search a city..."
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      {/* Placeholder for quick-favorite shortcuts once AsyncStorage is wired */}
      <Text style={styles.hint}>Your favorite cities will show here soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
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
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  hint: { marginTop: 30, color: '#888', fontSize: 13, textAlign: 'center' },
});

