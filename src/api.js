const API_KEY = 'BLVN7UBD9D84327ZGAZPAJWBG';

export async function getWeather(city = 'Brisbane,AU') {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?${API_KEY}`);
  console.log(response);
}
