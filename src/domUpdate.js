function getIconClass(iconId) {
  const iconMap = {
    snow: 'bxs-cloud-snow',
    rain: 'bxs-cloud-rain',
    fog: 'bxs-cloud-fog',
    wind: 'bxs-wind',
    cloudy: 'bxs-cloud',
    'partly-cloudy-day': 'bxs-cloud-sun',
    'partly-cloudy-night': 'bxs-cloud-moon',
    'clear-day': 'bxs-sun',
    'clear-night': 'bxs-moon',
  };
  return iconMap[iconId] || 'bxs-cloud'; // Default to cloud if not found
}

export function updateCity(city) {
  const cityElement = document.getElementById('city');
  if (cityElement) {
    cityElement.textContent = city;
  }
}

export function updateTemp(temp, unitGroup, iconId) {
  const tempElement = document.getElementById('temp');
  const unitGroupElement = document.getElementById('unitGroup');
  const iconElement = document.getElementById('temp-icon');

  if (tempElement && unitGroupElement && iconElement) {
    const displayUnit = unitGroup === 'metric' ? 'C' : 'F';
    tempElement.textContent = Math.round(temp); // Ensure temp is rounded
    unitGroupElement.textContent = `°${displayUnit}`;
    iconElement.className = `bx ${getIconClass(iconId)}`; // Update icon class
  }
}

export function updateForecast(forecast) {
  const forecastContainer = document.getElementById('forecast-container');
  if (forecastContainer) {
    forecastContainer.innerHTML = ''; // Clear previous content

    forecast.forEach((day, index) => {
      const forecastItem = document.createElement('div');
      forecastItem.classList.add('forecast-item');
      if (index !== forecast.length - 1) {
        forecastItem.style.borderRight = '1px solid #ccc'; // Add right border
      }

      const weekday = new Date(day.datetime).toLocaleDateString('en-US', {
        weekday: 'short',
      });
      const temp = Math.round(day.temp);
      const iconClass = getIconClass(day.icon);

      forecastItem.innerHTML = `
            <div>${weekday}</div>
            <i class="bx ${iconClass}"></i>
            <div>${temp}°</div>
          `;

      forecastContainer.appendChild(forecastItem);
    });
  }
}
