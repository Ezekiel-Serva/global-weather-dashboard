import Settings from 'src/app/(tabs)/settings.jsx'
import ContactScreens from 'src/app/screens/contactsScreen.js'
import { useColorScheme } from 'react-native'


<Stack.Navigator>
  <Stack.Screen name="Settings" component={Settings}/>
  <Stack.Screen name="Contact" component={Contact}/>
  <Stack.Screen name="About" component={About}/>
</Stack.Navigator>