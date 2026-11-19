import React from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { useRouter } from 'expo-router';

const Settings = () => {
  const { theme, isDark, toggleTheme, unit, toggleUnit } = useTheme()
  const router = useRouter()
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.generalCont, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={[styles.header, { backgroundColor: theme.primary }]}>
          <Text style={{ fontWeight: '700', fontSize: 20, color: theme.onPrimary }}>General</Text>
        </View>
        
        <View style={styles.genElemCont}>
          
          <View style={[styles.setting, styles.row, { backgroundColor: theme.background }]}>
            <Text style={{ color: theme.text }}>Dark mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ true: theme.primary }}
            />
          </View>

          <View style={[styles.setting, styles.row, { backgroundColor: theme.background }]}>
            <Text style={{ color: theme.text }}>Fahrenheit (°F)</Text>
            <Switch
              value={unit === 'F'}
              onValueChange={toggleUnit}
              trackColor={{ true: theme.primary }}
            />
          </View>

          <TouchableOpacity
            style={[styles.setting, { backgroundColor: theme.background }]}
            onPress={() => router.push('/screens/contactsScreen')}          
          >
            <Text style={{ color: theme.text }}>Contact the dev</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.setting, { backgroundColor: theme.background }]}
            onPress={() => router.push('/screens/aboutScreen')}
          >
            <Text style={{ color: theme.text }}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  generalCont: { borderWidth: 1, borderRadius: 10, overflow: 'hidden' },
  genElemCont: { padding: 5 },
  header: { padding: 12 },
  setting: { padding: 12, margin: 5, borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
})