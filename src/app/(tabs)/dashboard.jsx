// ---------- IMPORTS ----------
// React and useState (useState lets the screen "remember" values that can change)
import React, { useState } from 'react'

import { View, Text, StyleSheet, FlatList, Pressable, TextInput, Alert, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

// Functions that talk to the weather API: search cities, get weather, refresh weather
import { searchPlaces, getWeatherForPlace, refreshWeather } from '../../services/weatherApi'

// Custom hook for the favorites list (shared across the whole app)
import { useFavorites } from '../../context/FavoritesContext'

// Custom hook for colors (light/dark theme)
import { useTheme } from '../../context/ThemeContext'

const Dashboard = () => {
  // ---------- STATE (values the screen remembers) ----------

  // What the user is typing in the search box
  const [search, setSearch] = useState('')

  // The list of cities whose weather is shown on screen (the "search history")
  const [cities, setCities] = useState([])

  // If a search finds many places with the same name, they are stored here so the user can pick one
  const [matches, setMatches] = useState([])

  // true while we wait for the internet (shows "Loading...")
  const [loading, setLoading] = useState(false)

  // Error message to show the user (empty text = no error)
  const [error, setError] = useState('')

  // true while the user is pulling down to refresh
  const [refreshing, setRefreshing] = useState(false)

  // toggleFavorite = save/unsave a city, isFavorite = check if a city is already saved
  const { toggleFavorite, isFavorite } = useFavorites()

  // theme = colors, formatTemp = converts the temperature to the user's chosen unit
  const { theme, formatTemp } = useTheme()


  // ---------- FUNCTIONS ----------

  // Gets the weather of one chosen place and adds it to the list
  const addPlace = async (place) => {
    setMatches([])      // hide the list of choices
    setLoading(true)    // show "Loading..."
    setError('')        // remove any old error
    try {
      const w = await getWeatherForPlace(place)
      // Only add the city if it's not already in the list (prevents duplicates)
      // New city goes to the top: [w, ...cities]
      if (!cities.some((c) => c.id === w.id)) setCities([w, ...cities])

    } catch (e) {
      // Something went wrong (usually no internet)
      setError('Network error. Try again.')

    } finally {
      // Runs either way: success or error
      setLoading(false)
    }
  }

  // Runs when the user presses "search" on the keyboard
  const handleSearch = async () => {
    // If the box is empty (or only spaces), do nothing
    if (!search.trim()) return
    setLoading(true)
    setError('')
    setMatches([])
    try {
      const results = await searchPlaces(search.trim())
      if (results.length === 0) setError('City not found')        // nothing found
      else if (results.length === 1) await addPlace(results[0])   // exactly one → add it right away
      else setMatches(results)                                    // many → let the user choose
    }
    catch (e) {
      setError('Network error. Try again.')
    }
    finally {
      setLoading(false)
    }
  }

  // Asks "are you sure?" and then wipes the whole list
  const clearHistory = () => {
    Alert.alert('Clear search history', 'Remove all searched cities from this list?', [
      // Cancel button: just closes the popup
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive', // red button on iOS
        onPress: () => {
          // Reset everything back to empty
          setCities([])
          setMatches([])
          setSearch('')
          setError('')
        },
      },
    ])
  }

  // Runs when the user pulls down the list: updates the weather of ALL cities
  const refreshCities = async () => {
    setRefreshing(true) // show the spinner
    // Refresh every city at the same time (Promise.all waits until all are done)
    const updated = await Promise.all(
      cities.map(async (c) => {
        try {
          return await refreshWeather(c) // new weather data
        } catch (e) {
          return c // if it fails, keep the old data so the city doesn't disappear
        }
      })
    )
    setCities(updated)     // replace the list with the updated data
    setRefreshing(false)   // hide the spinner
  }

  // ---------- WHAT SHOWS ON SCREEN ----------
  return (
    // Main container, background color comes from the theme
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

      {/* Search box */}
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
        ]}
        placeholderTextColor={theme.subText}
        value={search}                  // the text shown in the box
        onChangeText={setSearch}        // update 'search' every time the user types
        onSubmitEditing={handleSearch}  // search when the user presses the keyboard's search key
        returnKeyType="search"          // keyboard button says "search"
        placeholder="Search for a city"
        autoCapitalize="words"          // capitalizes each word (e.g. "Quezon City")
      />

      {/* Show "Loading..." only while loading is true */}
      {loading && <Text style={{ color: theme.text }}>Loading...</Text>}
      {/* Show the error message in red only if there is one */}
      {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}

      {/* If the search found several places, show them as tappable choices */}
      {matches.map((m) => (
        <Pressable
          key={m.id}                    // unique id so React can track each item
          style={[styles.match, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => addPlace(m)}   // tapping a choice adds that city
        >
          <Text style={{ color: theme.text }}>
            {/* Show name, region and country (skips any that are missing) */}
            {[m.name, m.admin1, m.country].filter(Boolean).join(', ')}
          </Text>
        </Pressable>
      ))}

      {/* "Clear search history" button – only appears when there is at least one city */}
      {cities.length > 0 && (
        <Pressable style={styles.clearBtn} onPress={clearHistory}>
          <Ionicons name="trash-outline" size={18} color={theme.heart} />
          <Text style={[styles.clearText, { color: theme.heart }]}>
            Clear search history
          </Text>
        </Pressable>
      )}

      {/* Scrollable list of weather cards (FlatList is efficient for long lists) */}
      <FlatList
        data={cities}                               // the list to display
        keyExtractor={(item) => String(item.id)}    // unique key for each card
        // Pull-to-refresh feature
        refreshControl={
          <RefreshControl
            refreshing={refreshing}       // is the spinner showing?
            onRefresh={refreshCities}     // what to do when the user pulls down
            colors={[theme.primary]}      // spinner color (Android)
            tintColor={theme.primary}     // spinner color (iOS)
          />
        }
        // How ONE city card looks (this runs once per city)
        renderItem={({ item }) => {
          // Check if this city is already saved as a favorite
          const added = isFavorite(item.id)
          return (
            <View style={[styles.card, { backgroundColor: theme.card }]}>

              {/* LEFT side: city name, country, and Save button */}
              <View style={styles.left}>
                <Text style={[styles.cardCity, { color: theme.text }]}>{item.city}</Text>
                <Text style={[styles.sub, { color: theme.subText }]}>{item.country}</Text>
                {/* Heart button: tap to save/unsave the city */}
                <Pressable style={styles.favBtn} onPress={() => toggleFavorite(item)}>
                  <Ionicons
                    name={added ? 'heart' : 'heart-outline'}  // filled heart if saved, empty if not
                    size={20}
                    color={theme.heart}
                  />
                  <Text style={[styles.favText, { color: theme.heart }]}>
                    {added ? 'Saved' : 'Save'}
                  </Text>
                </Pressable>
              </View>

              {/* RIGHT side: temperature, condition, humidity, wind */}
              <View style={styles.right}>
                <Text style={[styles.temp, { color: theme.primary }]}>
                  {formatTemp(item.temp)}   {/* converts to °C or °F */}
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

// Lets other files import this screen
export default Dashboard

// ---------- STYLES (how things look) ----------
const styles = StyleSheet.create({
  // Whole screen: fills all space, with 12px space around the edges
  container: { flex: 1, padding: 12 },
  // Search box: border, rounded corners, inner spacing
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  // The tappable choices when many cities match
  match: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 6 },
  // Weather card: left and right sections side by side
  card: {
    flexDirection: 'row',              // place children left-to-right
    justifyContent: 'space-between',   // push left and right sections apart
    borderRadius: 12,
    elevation: 2,                      // small shadow (Android)
    marginBottom: 10,
    padding: 16,
  },
  left: { flex: 1 },                   // left side takes the extra space
  right: { alignItems: 'flex-end' },   // right side text aligned to the right
  cardCity: { fontSize: 20, fontWeight: '700' },  // city name (big, bold)
  sub: { fontSize: 13 },                          // small gray text
  temp: { fontSize: 28, fontWeight: '700' },      // temperature (biggest text)
  condition: { fontSize: 15, marginBottom: 4 },   // e.g. "Cloudy"
  // Heart + "Save" text in one row
  favBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  favText: { marginLeft: 4 },
  // "Clear search history" button: icon + text, aligned to the right
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  clearText: { marginLeft: 4, fontSize: 14 },
})
