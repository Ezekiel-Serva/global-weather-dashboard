import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getCityWeather } from '../../services/weatherApi'
import { useFavorites } from '../../context/FavoritesContext'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const { toggleFavorite, isFavorite } = useFavorites()
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { theme } = useTheme() 

  const handleSearch = async () => {
    if (!search.trim()) return
    setLoading(true)
    setError('')
    try {
      const result = await getCityWeather(search.trim())
      if (!result) {
        setError('City not found in the Philippines')
      } else if (!cities.some((c) => c.city === result.city)) {
        setCities([result, ...cities])
      }
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
        setSearch('')
        setError('')
      },
    },
  ])
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
      key={1}
      numColumns={1}
      keyExtractor={(item) => item.city}
      renderItem={({ item }) => {
        const added = isFavorite(item.city)
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
              <Text style={[styles.temp, { color: theme.primary }]}>{item.temp}°C</Text>
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
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f2f4f7',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c9d3dc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 10,
    padding: 16,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  cardCity: {
    fontSize: 20,
    fontWeight: '700',
  },
  sub: {
    color: '#6b7785',
    fontSize: 13,
  },
  temp: {
    fontSize: 28,
    fontWeight: '700',
  },
  condition: {
    fontSize: 15,
    marginBottom: 4,
  },
  favBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  favText: {
    marginLeft: 4,
    color: '#e0245e',
  },
  clearBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-end',
  marginBottom: 8,
  },
  clearText: {
  marginLeft: 4,
  fontSize: 14,
},
})