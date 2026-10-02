import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SampleCity from '../sampleCity'

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])
  const toggleFavorites = (city) => {
    if (favorites.includes(city)) {
      setFavorites(favorites.filter((c) => c !== city))
    }
    else {
      setFavorites([...favorites, city])
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Dashboard</Text> */}
      <TextInput 
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Search for a city"
        autoCapitalize="words"
      />
      
      <View style={styles.cardCont}>
      <FlatList
        data={SampleCity}
        key={1}
        numColumns={1}
        keyExtractor={( item ) => item.city}
        renderItem={({ item }) => {
          
          const added = favorites.includes(item.city)
          return (
          <View style={styles.card}>
            <View>
              <Pressable
                onPress={()=> toggleFavorites(item.city)}
                >
                <Text style={{color: 'red'}}>
                  {added ? 'Added!' : 'Add to favorites'}
                </Text>
              </Pressable>
              
              <Text style={styles.cardCity}>{item.city}</Text>
              <Text>{item.country}</Text>
            </View>
            <View>
              <Text>{item.temp}°C</Text>
              <Text>{item.condition}</Text>
              <Text>{item.humidity}%</Text>
              <Text>{item.wind}km/h</Text>
            </View>
          </View>
          )
        }}
      />
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    elevation: 2,
    margin: 5,
    padding: 20,
  },
  cardCont: {
    borderTopWidth: 2,
    borderColor: '#7292a6'
    
  },
  cardCity: {
    fontSize: 20,
    fontWeight: 'bolder'
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 25,
    marginTop: -20

  }
})
