import React from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useFavorites } from '../../context/FavoritesContext'
import { useTheme } from '../../context/ThemeContext'


const Favorites = () => {
  const { theme, formatTemp } = useTheme()
  const { favorites, toggleFavorite, refreshFavorites, refreshing } = useFavorites()

  return (
   <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
    {favorites.length === 0 && (
      <Text style={[styles.empty, { color: theme.subText }]}>
        No favorites yet. Add some from the Dashboard.
      </Text>
    )}

    <FlatList
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.left}>
            <Text style={[styles.cardCity, { color: theme.text }]}>{item.city}</Text>
            <Text style={[styles.sub, { color: theme.subText }]}>{item.country}</Text>
            <Pressable style={styles.favBtn} onPress={() => toggleFavorite(item)}>
              <Ionicons name="heart-dislike-outline" size={20} color={theme.heart} />
              <Text style={[styles.favText, { color: theme.heart }]}>Remove</Text>
            </Pressable>
          </View>

          <View style={styles.right}>
            <Text style={[styles.temp, { color: theme.primary }]}>{formatTemp(item.temp)}</Text>
            <Text style={[styles.condition, { color: theme.text }]}>{item.condition}</Text>
            <Text style={[styles.sub, { color: theme.subText }]}>Humidity {item.humidity}%</Text>
            <Text style={[styles.sub, { color: theme.subText }]}>Wind {item.wind} km/h</Text>
          </View>
        </View>
      )}
      refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={refreshFavorites}
        colors={[theme.primary]}
        tintColor={theme.primary}
      />
      }
    />
  </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f2f4f7',
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
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6b7785',
  },
})