import { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  // Stub: swap for AsyncStorage-backed state + real theme context once wired
  const [darkMode, setDarkMode] = useState(false);
  const [useFahrenheit, setUseFahrenheit] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Use Fahrenheit (°F)</Text>
        <Switch value={useFahrenheit} onValueChange={setUseFahrenheit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingTop: 60, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    marginBottom: 24 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: { 
    fontSize: 16 
  },
});

