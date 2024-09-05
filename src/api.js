import { updateCity, updateTemp, updateForecast } from './domUpdate';

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

    // Update the DOM with the temperature and icon
    updateTemp(
      data.currentConditions.temp,
      unitGroup,
      data.currentConditions.icon,
    );

    // Destructuring the resolved address to get city and country
    const { resolvedAddress, days } = data;
    const [cityName, , countryName] = resolvedAddress.split(',').map((part) => {
      return part.trim();
    });
    const cityCountry = `${cityName}, ${countryName}`;
    updateCity(cityCountry);

    // Update the 7-day forecast
    updateForecast(days.slice(0, 7)); // Pass the first 7 days to the update function
  } catch (err) {
    alert(`Failed to fetch weather data: ${err.message}`);
  }
}
