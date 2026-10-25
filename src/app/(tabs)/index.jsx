import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../context/ThemeContext'

const Index = () => {
  const { theme } = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.mainCont,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Ionicons name="partly-sunny" size={48} color={theme.primary} />
        <Text style={[styles.header, { color: theme.text }]}>
          Global Weather Dashboard
        </Text>
        <Text style={[styles.description, { color: theme.subText }]}>
          Search any city in the Philippines to see its live weather, and save your favorites.
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCont: {
    width: 280,
    borderWidth: 1,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    paddingBottom: 7,
  },
  description: {
    textAlign: 'center',
  },
})