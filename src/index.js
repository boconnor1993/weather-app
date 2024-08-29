import './styles.css';
import { getWeather } from './api';

let city = 'Brisbane';
let unitGroup = 'metric';

getWeather(city, unitGroup); // Initial weather fetch

// Temperature switch
document.addEventListener('DOMContentLoaded', () => {
  const unitGroupElement = document.getElementById('unitGroup-switch');
  unitGroupElement.addEventListener('click', () => {
    unitGroup = unitGroup === 'metric' ? 'us' : 'metric';
    getWeather(city, unitGroup);
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
    city = searchInput.value;
    getWeather(city, unitGroup);
    searchInput.value = '';
  });
});
