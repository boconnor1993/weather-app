export function updateCity(city) {
  const cityElement = document.getElementById('city');
  cityElement.textContent = city;
}

export function updateTemp(temp, unitGroup) {
  const tempElement = document.getElementById('temp');
  const unitGroupElement = document.getElementById('unitGroup');
  const displayUnit = unitGroup === 'metric' ? 'C' : 'F';
  tempElement.textContent = temp;
  unitGroupElement.textContent = `°${displayUnit}`;
}
