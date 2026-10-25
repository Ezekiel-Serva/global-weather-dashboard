const CODES = {
  0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Cloudy',
  45: 'Fog', 48: 'Fog', 51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
}

export const getCityWeather = async (name) => {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&country_code=PH`
  )
  const geo = await geoRes.json()
  if (!geo.results) return null

  const { name: city, admin1, latitude, longitude } = geo.results[0]

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia/Manila`
  )
  const data = await res.json()
  const c = data.current

  return {
    city,
    country: admin1 ?? 'Philippines',
    temp: Math.round(c.temperature_2m),
    condition: CODES[c.weather_code] ?? 'Unknown',
    humidity: c.relative_humidity_2m,
    wind: Math.round(c.wind_speed_10m),
  }
}