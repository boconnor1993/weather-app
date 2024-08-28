import { updateCity, updateTemp } from './domUpdate.js';

const API_KEY = 'BLVN7UBD9D84327ZGAZPAJWBG';

export async function getWeather(city = 'Brisbane', unitGroup = 'metric') {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    updateTemp(data.currentConditions.temp, unitGroup);
    updateCity(data.address);
    console.log(data.currentConditions.temp);
  } catch (err) {
    console.error('Fetch error: ', err);
  }
}
