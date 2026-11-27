const CODES = {
  0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Cloudy',
  45: 'Fog', 48: 'Fog',
  51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle', 56: 'Drizzle', 57: 'Drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Light rain', 67: 'Rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
  85: 'Snow showers', 86: 'Snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
}

export const searchPlaces = async (name) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5`
  )
  const geo = await res.json()
  return geo.results ?? []
}

export const getWeatherForPlace = async (place) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
  )
  const data = await res.json()
  const c = data.current

  return {
    id: place.id,
    city: place.name,
    country: [place.admin1, place.country].filter(Boolean).join(', '),
    latitude: place.latitude,
    longitude: place.longitude,
    temp: Math.round(c.temperature_2m),
    condition: CODES[c.weather_code] ?? 'Unknown',
    humidity: c.relative_humidity_2m,
    wind: Math.round(c.wind_speed_10m),
  }
}

// re-fetch weather for a city we already have saved
export const refreshWeather = (city) =>
  getWeatherForPlace({
    id: city.id,
    name: city.city,
    admin1: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
  })

// picks an icon name (Ionicons) for a condition
export const weatherIcon = (condition = '') => {
  const c = condition.toLowerCase()
  if (c.includes('thunder')) return 'thunderstorm'
  if (c.includes('snow')) return 'snow'
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return 'rainy'
  if (c.includes('fog') || c === 'cloudy') return 'cloudy'
  if (c.includes('partly')) return 'partly-sunny'
  if (c.includes('clear')) return 'sunny'
  return 'cloud'
}