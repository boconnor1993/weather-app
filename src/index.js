import './styles.css';
import { getWeather } from './api';

let city = 'Brisbane';
let unitGroup = 'metric';

getWeather(city, unitGroup); // This will call the getWeather function from the api.js file
