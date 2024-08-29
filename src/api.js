import { updateCity, updateTemp } from './domUpdate.js';

const API_KEY = 'BLVN7UBD9D84327ZGAZPAJWBG';

export async function getWeather(city = 'Brisbane', unitGroup = 'metric') {
  try {
    // Fetch data from the API
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`,
      {
        method: 'GET',
      },
    );

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the data
    const data = await response.json();

    // Update the DOM with the temperature
    updateTemp(data.currentConditions.temp, unitGroup);

    // Get the city and country from the resolved address
    const resolvedAddress = data.resolvedAddress;
    const addressParts = resolvedAddress.split(',');
    const cityName = addressParts[0].trim(); // First part is the city
    const countryName = addressParts[addressParts.length - 1].trim(); // Last part is the country
    const cityCountry = `${cityName}, ${countryName}`;
    updateCity(cityCountry);

    console.log(data);
  } catch (err) {
    console.error('Fetch error: ', err);
  }
}
