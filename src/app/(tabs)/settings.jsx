import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView} from 'react-native-safe-area-context'

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.generalCont}>
        <View style={styles.header}><Text style={{fontWeight: 700, fontSize: 20}}>General</Text></View>
        <View style={styles.genElemCont}>
          <View style={styles.setting}><Text>Appearance</Text></View>
          <View style={styles.setting}><Text>Contact us</Text></View>
          <View style={styles.setting}><Text>About</Text></View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  generalCont: {
    backgroundColor: '#d9d9d9',
    borderWidth: 1,
    height: 'auto',
    borderRadius: 5
  },
  genElemCont: {
    padding: 5,
  },
  header: {
    backgroundColor: '#efefef',
    padding: 10,
    borderRadius: 5
  },
  setting: {
    padding: 10,
    margin: 5,
    backgroundColor: '#c2c2c2',
    borderRadius: 5
  }

})
