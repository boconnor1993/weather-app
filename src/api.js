import { updateCity, updateTemp } from './domUpdate';

const API_KEY = 'BLVN7UBD9D84327ZGAZPAJWBG';

export default async function getWeather(
  city = 'Brisbane',
  unitGroup = 'metric',
) {
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

    // Update the DOM with the temperature
    updateTemp(data.currentConditions.temp, unitGroup);

    // Destructuring the resolved address to get city and country
    const { resolvedAddress } = data;
    const [cityName, , countryName] = resolvedAddress.split(',').map((part) => {
      return part.trim();
    });
    const cityCountry = `${cityName}, ${countryName}`;
    updateCity(cityCountry);
  } catch (err) {
    alert(`Failed to fetch weather data: ${err.message}`);
  }
}
