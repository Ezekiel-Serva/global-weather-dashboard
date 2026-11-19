import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

export default function ContactsScreen() {
  const { theme } = useTheme()

  const openLink = (url) => {
    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Email</Text>
        
        <TouchableOpacity onPress={() => Linking.openURL('mailto:ezekielserva95@gmail.com')}>
          <Text style={[styles.link, { color: theme.primary }]}>ezekielserva95@gmail.com</Text>
        </TouchableOpacity>

        <Text style={[styles.desc, { color: theme.text + '99' }]}>
          Got questions or feedback? Tap the email above and I'll get back to you.
        </Text>

        <Text style={[styles.title, { color: theme.text, paddingTop: 35 }]}>Socials</Text>
        <Text style={[styles.desc, { color: theme.text + '99', paddingBottom: 10 }]}>
          You can also message me on my social media.
        </Text>

        {/*FaceBook*/}
        <TouchableOpacity
          style={[styles.row, { backgroundColor: theme.background }]}
          onPress={() => openLink('https://www.facebook.com/ezekiel.serva.3')}
        >
          <FontAwesome name="facebook-square" size={24} color="#1877F2" />
          <Text style={[styles.rowText, {color: theme.text} ]}>Facebook</Text>
        </TouchableOpacity>

        {/*Instagram*/}
        <TouchableOpacity
          style={[styles.row, {backgroundColor: theme.background }]}
          onPress={() => openLink('https://www.instagram.com/_zek._08?jplx=ZG1qYWw5Mm5hY2c=')}
        >
          <AntDesign name="instagram" size={24} color="#E4405F" />
          <Text style={[styles.rowText, { color: theme.text }]}>Instagram</Text>
        </TouchableOpacity>
        
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
  link: { fontSize: 16, marginBottom: 8, textDecorationLine: 'underline' },
  desc: { 
    fontSize: 14, 
    lineHeight: 20 
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  rowText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '700',
  }
})