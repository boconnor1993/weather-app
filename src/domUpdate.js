export function updateCity(city) {
  const cityElement = document.getElementById('city');
  cityElement.textContent = city;
}

export function updateTemp(temp) {
  const tempElement = document.getElementById('temp');
  tempElement.textContent = temp;
}
