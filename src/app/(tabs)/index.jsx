import React from 'react'
import { Link, Stack } from 'expo-router'
import { View, Text, StyleSheet,  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainCont}>
        <Text style={styles.header}>Global Weather Dashboard</Text>
        <Text style={styles.description}>Future update: App will be able to fetch live weather data and saves a list of favorite cities.</Text>
      </View>

    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7cadd',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  mainCont: {
    backgroundColor: '#e9ecee',
    height: 'auto',
    width: 250,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    elevation: 3
  },
  header: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
    paddingBottom: 7
  },
  description: {
    color: '#424242',
    textAlign: 'center',
  }
})
