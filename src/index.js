import './styles.css';
import { getWeather } from './api';

let selectedCity = 'Brisbane';
let selectedUnitGroup = 'metric';

function showLoadingSpinner() {
  document.getElementById('loading-spinner').style.display = 'block';
  document.querySelector('main').classList.add('hidden');
}

function hideLoadingSpinner() {
  document.getElementById('loading-spinner').style.display = 'none';
  document.querySelector('main').classList.remove('hidden');
}

async function loadWeather(city = selectedCity, unitGroup = selectedUnitGroup) {
  showLoadingSpinner();
  await getWeather(city, unitGroup);
  hideLoadingSpinner();
}

document.addEventListener('DOMContentLoaded', () => {
  loadWeather(); // Initial weather fetch

  // Temperature switch
  const unitGroupElement = document.getElementById('unitGroup-switch');
  unitGroupElement.addEventListener('click', () => {
    selectedUnitGroup = selectedUnitGroup === 'metric' ? 'us' : 'metric';
    loadWeather(selectedCity, selectedUnitGroup);
  });

  // Dark mode toggle
  const darkModeElement = document.getElementById('dark-mode');
  darkModeElement.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // City search
  const searchForm = document.querySelector('.search-box');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    selectedCity = searchInput.value;
    loadWeather(selectedCity, selectedUnitGroup);
  });
});
