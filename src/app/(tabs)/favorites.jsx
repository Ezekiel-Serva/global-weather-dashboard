import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView} from 'react-native-safe-area-context'
import SampleCity from '../sampleCity'

const Favorites = () => {

  return (
    <SafeAreaView>
      <FlatList
        data={SampleCity}
        key={1}
        numColumns={1}
        keyExtractor={( item ) => item.city}
        renderItem={({ item }) => {
         return( 
          <View style={styles.card}>
            <View style={styles.city}>
              <Text style={{fontWeight: 700}}>{item.city}</Text>
              <Text>{item.country}</Text>
            </View>
  >
            <View style={styles.temp}>
              <Text>{item.temp}</Text> 
              <Text>{item.condition}</Text>
              <Text>{item.humidity}</Text>
              <Text>{item.wind}</Text>
            </View>
          </View>
          )
        }}


      />
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#e4e4e4',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    elevation: 2,
    borderRadius: 5
  },
  city: {
    padding: 5
  }

})
