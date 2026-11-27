import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { getWeatherForPlace, weatherIcon } from '../../services/weatherApi';

import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';

// default city if favorites is empty
const CALBAYOG = {
   id: "calbayog-default",
   name: "Calbayog City",
   admin1: "Samar",
   country: "Philippines",
   latitude: 12.0667,
   longitude: 124.6
}

export default function Index() {
   const router = useRouter()
   const { theme, formatTemp } = useTheme()
   const { favorites, refreshFavorites, refreshing } = useFavorites()
   const [ calbayog, setCalbayog ] = useState(null)
   const [ loadingDefault, setLoadingDefault ] = useState(false)
   const [ error, setError ] = useState('')

   {/* For calbayog only */ }
   const loadCalbayog = async () => {
      setLoadingDefault(true)
      setError('')

      try {
         setCalbayog(await getWeatherForPlace(CALBAYOG))
      }
      catch (error) {
         setError('Failed to load weather')
      }
      finally {
         setLoadingDefault(false)

      }
   }

   {/* loads calbayogs current weather on mount */ }
   useEffect(() => {
      loadCalbayog()
   }, [])



   {/* uncomment this and comment the one below if you want to Not replace the default, while keeping the refresh function work on favorites list */}
   
   const featured = calbayog

   const onRefresh = () => {
      loadCalbayog()
      refreshFavorites()
   }
   
   const isRefreshing = loadingDefault || refreshing
   
   
   
   {/* if theres no favorites added load calbayog as a fallback */ }
   {/* The one 
   const hasFavorites = favorites.length > 0
   const featured = hasFavorites ? favorites[ 0 ] : calbayog
   const onRefresh = hasFavorites ? refreshFavorites : loadCalbayog
   const isRefreshing = hasFavorites ? refreshing : loadingDefault
   {/* The one */}

   return (
      <SafeAreaView style={[ styles.container, { backgroundColor: theme.background } ]}>

         <ScrollView
            contentContainerStyle={styles.content}

            refreshControl={
               <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  colors={[ theme.primary ]}
                  tintColor={theme.primary}
               />
            }
         >
            <Text style={[ styles.title, { color: theme.text } ]}>
               Global Weather Dashboard
            </Text>

            <Text style={[ styles.label, { color: theme.subText } ]}>
               Weather in Calbayog
               {/* hasFavorites ? 'Your top favorite' : 'Weather in Calbayog'*/}
            </Text>

            {/* && means the Text component only renders when that condition is true. */}
            {error !== '' && (<Text style={{ color: 'red', marginBottom: 8 }}> {error} </Text>)}

            {/* display this card if featured aint null */}
            {featured && (
               <View style={[ styles.hero, { backgroundColor: theme.card, borderColor: theme.border }, ]}>
                  <Ionicons
                     name={weatherIcon(featured.condition)}
                     size={72}
                     color={theme.primary}
                  />

                  <Text style={[ styles.heroTemp, { color: theme.text } ]}>
                     {formatTemp(featured.temp)}
                  </Text>

                  <Text style={[ styles.heroCondition, { color: theme.primary } ]}>
                     {featured.condition}
                  </Text>

                  <Text style={[ styles.heroCity, { color: theme.text } ]}>
                     {featured.city}
                  </Text>

                  <Text style={[ styles.sub, { color: theme.subText } ]}>
                     {featured.country}
                  </Text>

                  <View style={styles.statsRow}>
                     <Text style={[ styles.sub, { color: theme.subText } ]}>
                        Humidity {featured.humidity}%
                     </Text>

                     <Text style={[ styles.sub, { color: theme.subText } ]}>
                        Wind {featured.wind} km/h
                     </Text>
                  </View>
               </View>
            )}

            <Text style={[ styles.sub, { color: theme.subText, textAlign: 'center', marginTop: 10, }, ]}>
               Pull down to refresh
            </Text>

            {/* Routes to dashboard */}
            <Pressable
               style={[ styles.btn, { backgroundColor: theme.primary } ]}
               onPress={() => router.push('/dashboard')}
            >
               <Ionicons name="search" size={18} color={theme.onPrimary} />
               <Text style={[ styles.btnText, { color: theme.onPrimary } ]}>
                  Search a city
               </Text>
            </Pressable>

            {/* routes to favorites */}
            <Pressable
               style={[
                  styles.btn,
                  styles.btnOutline,
                  { borderColor: theme.primary },
               ]}
               onPress={() => router.push('/favorites')}
            >
               <Ionicons name="heart" size={18} color={theme.primary} />

               <Text style={[ styles.btnText, { color: theme.primary } ]}>
                  Favorites ({favorites.length})
               </Text>
            </Pressable>


         </ScrollView>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: { flex: 1 },
   content: { padding: 16 },
   title: {
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
   },
   label: {
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 14,
   },
   hero: {
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 16,
      padding: 24,
      elevation: 3,
   },
   heroTemp: {
      fontSize: 56,
      fontWeight: '700',
      marginTop: 8,
   },
   heroCondition: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
   },
   heroCity: {
      fontSize: 22,
      fontWeight: '700',
   },
   sub: { fontSize: 13 },
   statsRow: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 12,
   },
   btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 14,
      marginTop: 14,
      gap: 8,
   },
   btnOutline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
   },
   btnText: {
      fontSize: 16,
      fontWeight: '600',
   },
})

