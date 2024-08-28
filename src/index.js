import './styles.css';
import { getWeather } from './api';
import './switches';

let city = 'Brisbane';
let unitGroup = 'metric';

getWeather(city, unitGroup); // This will call the getWeather function from the api.js file

// Temperature switch
document.addEventListener('DOMContentLoaded', () => {
    const unitGroupElement = document.getElementById('unitGroup-switch');
    unitGroupElement.addEventListener('click', () => {
        unitGroup = unitGroup === 'metric' ? 'us' : 'metric';
        getWeather(city, unitGroup);
    });
});

// Dark mode
document.addEventListener('DOMContentLoaded', () => {
    const darkModeElement = document.getElementById('dark-mode');
    darkModeElement.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});