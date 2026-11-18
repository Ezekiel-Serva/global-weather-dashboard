import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Alert, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { searchPlaces, getWeatherForPlace, refreshWeather } from '../../services/weatherApi'
import { useFavorites } from '../../context/FavoritesContext'
import { useTheme } from '../../context/ThemeContext'

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const [cities, setCities] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const { toggleFavorite, isFavorite } = useFavorites()
  const { theme, formatTemp } = useTheme()

  const addPlace = async (place) => {
    setMatches([])
    setLoading(true)
    setError('')
    try {
      const w = await getWeatherForPlace(place)
      if (!cities.some((c) => c.id === w.id)) setCities([w, ...cities])
    } catch (e) {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!search.trim()) return
    setLoading(true)
    setError('')
    setMatches([])
    try {
      const results = await searchPlaces(search.trim())
      if (results.length === 0) setError('City not found in the Philippines')
      else if (results.length === 1) await addPlace(results[0])
      else setMatches(results)
    } catch (e) {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = () => {
    Alert.alert('Clear search history', 'Remove all searched cities from this list?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          setCities([])
          setMatches([])
          setSearch('')
          setError('')
        },
      },
    ])
  }

  const refreshCities = async () => {
  setRefreshing(true)
  const updated = await Promise.all(
    cities.map(async (c) => {
      try {
        return await refreshWeather(c)
      } catch (e) {
        return c
      }
    })
  )
  setCities(updated)
  setRefreshing(false)
}

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
        ]}
        placeholderTextColor={theme.subText}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        placeholder="Search for a city"
        autoCapitalize="words"
      />

      {loading && <Text style={{ color: theme.text }}>Loading...</Text>}
      {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}

      {matches.map((m) => (
        <Pressable
          key={m.id}
          style={[styles.match, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => addPlace(m)}
        >
          <Text style={{ color: theme.text }}>
            {m.name}{m.admin1 ? `, ${m.admin1}` : ''}
          </Text>
        </Pressable>
      ))}

      {cities.length > 0 && (
        <Pressable style={styles.clearBtn} onPress={clearHistory}>
          <Ionicons name="trash-outline" size={18} color={theme.heart} />
          <Text style={[styles.clearText, { color: theme.heart }]}>
            Clear search history
          </Text>
        </Pressable>
      )}

      <FlatList
        data={cities}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={refreshCities}
        colors={[theme.primary]}
        tintColor={theme.primary}
        />
        }
        renderItem={({ item }) => {
          const added = isFavorite(item.id)
          return (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <View style={styles.left}>
                <Text style={[styles.cardCity, { color: theme.text }]}>{item.city}</Text>
                <Text style={[styles.sub, { color: theme.subText }]}>{item.country}</Text>
                <Pressable style={styles.favBtn} onPress={() => toggleFavorite(item)}>
                  <Ionicons
                    name={added ? 'heart' : 'heart-outline'}
                    size={20}
                    color={theme.heart}
                  />
                  <Text style={[styles.favText, { color: theme.heart }]}>
                    {added ? 'Saved' : 'Save'}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.right}>
                <Text style={[styles.temp, { color: theme.primary }]}>
                  {formatTemp(item.temp)}
                </Text>
                <Text style={[styles.condition, { color: theme.text }]}>{item.condition}</Text>
                <Text style={[styles.sub, { color: theme.subText }]}>Humidity {item.humidity}%</Text>
                <Text style={[styles.sub, { color: theme.subText }]}>Wind {item.wind} km/h</Text>
              </View>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  match: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 6 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 10,
    padding: 16,
  },
  left: { flex: 1 },
  right: { alignItems: 'flex-end' },
  cardCity: { fontSize: 20, fontWeight: '700' },
  sub: { fontSize: 13 },
  temp: { fontSize: 28, fontWeight: '700' },
  condition: { fontSize: 15, marginBottom: 4 },
  favBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  favText: { marginLeft: 4 },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  clearText: { marginLeft: 4, fontSize: 14 },
})