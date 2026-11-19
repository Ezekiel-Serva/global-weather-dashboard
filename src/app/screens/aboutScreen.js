import { View, Text, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'

export default function AboutScreen() {
  const { theme } = useTheme()

  return(
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Hey! I'm Ezekiel 👋</Text>
      <Text style={[styles.desc, { color: theme.text + '99' }]}>
        
        I built this app as my major course output for Computer Science and to learn mobile programming with React Native + Expo.
        {'\n\n'}
        This is a solo project, so everything here, the code, design, and bugs, is mine. 
        I'm still learning and improving it as I go.
        {'\n\n'}
        Thanks for supporting a student dev! If you have feedback or suggestions, feel free to message me.
      </Text>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 16,
  },
  title: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 12 
  },
  desc: { 
    fontSize: 14, 
    lineHeight: 20 
  },
  
})