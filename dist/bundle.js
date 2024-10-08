/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getWeather)\n/* harmony export */ });\n/* harmony import */ var _domUpdate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domUpdate */ \"./src/domUpdate.js\");\n\nconst API_KEY = 'BLVN7UBD9D84327ZGAZPAJWBG';\nasync function getWeather(city = 'Brisbane', unitGroup = 'metric') {\n  try {\n    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`, {\n      method: 'GET'\n    });\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n\n    // Update the DOM with the temperature\n    (0,_domUpdate__WEBPACK_IMPORTED_MODULE_0__.updateTemp)(data.currentConditions.temp, unitGroup);\n\n    // Destructuring the resolved address to get city and country\n    const {\n      resolvedAddress,\n      days\n    } = data;\n    const [cityName,, countryName] = resolvedAddress.split(',').map(part => {\n      return part.trim();\n    });\n    const cityCountry = `${cityName}, ${countryName}`;\n    (0,_domUpdate__WEBPACK_IMPORTED_MODULE_0__.updateCity)(cityCountry);\n\n    // Update the 7-day forecast\n    (0,_domUpdate__WEBPACK_IMPORTED_MODULE_0__.updateForecast)(days.slice(0, 7)); // Pass the first 7 days to the update function\n  } catch (err) {\n    alert(`Failed to fetch weather data: ${err.message}`);\n  }\n}\n\n//# sourceURL=webpack://weather-app/./src/api.js?");

/***/ }),

/***/ "./src/domUpdate.js":
/*!**************************!*\
  !*** ./src/domUpdate.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateCity: () => (/* binding */ updateCity),\n/* harmony export */   updateForecast: () => (/* binding */ updateForecast),\n/* harmony export */   updateTemp: () => (/* binding */ updateTemp)\n/* harmony export */ });\nfunction updateCity(city) {\n  const cityElement = document.getElementById('city');\n  if (cityElement) {\n    cityElement.textContent = city;\n  }\n}\nfunction updateTemp(temp, unitGroup) {\n  const tempElement = document.getElementById('temp');\n  const unitGroupElement = document.getElementById('unitGroup');\n  if (tempElement && unitGroupElement) {\n    const displayUnit = unitGroup === 'metric' ? 'C' : 'F';\n    tempElement.textContent = Math.round(temp); // Ensure temp is rounded\n    unitGroupElement.textContent = `°${displayUnit}`;\n  }\n}\nfunction updateForecast(forecast) {\n  const forecastContainer = document.getElementById('forecast-container');\n  if (forecastContainer) {\n    forecastContainer.innerHTML = ''; // Clear previous content\n\n    forecast.forEach(day => {\n      const forecastItem = document.createElement('div');\n      forecastItem.classList.add('forecast-item');\n      const weekday = new Date(day.datetime).toLocaleDateString('en-US', {\n        weekday: 'short'\n      });\n      const iconUrl = `https://www.visualcrossing.com/weather/weather-icons/${day.icon}.svg`;\n      const temp = Math.round(day.temp);\n      forecastItem.innerHTML = `\n          <div>${weekday}</div>\n          <div>${temp}°</div>\n        `;\n      forecastContainer.appendChild(forecastItem);\n    });\n  }\n}\n\n//# sourceURL=webpack://weather-app/./src/domUpdate.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\n\nlet selectedCity = 'Brisbane';\nlet selectedUnitGroup = 'metric';\nfunction showLoadingSpinner() {\n  document.getElementById('loading-spinner').style.display = 'block';\n  document.querySelector('main').classList.add('hidden');\n}\nfunction hideLoadingSpinner() {\n  document.getElementById('loading-spinner').style.display = 'none';\n  document.querySelector('main').classList.remove('hidden');\n}\nasync function loadWeather(city = selectedCity, unitGroup = selectedUnitGroup) {\n  showLoadingSpinner();\n  await (0,_api__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(city, unitGroup);\n  hideLoadingSpinner();\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  loadWeather(); // Initial weather fetch\n\n  // Temperature switch\n  const unitGroupElement = document.getElementById('unitGroup-switch');\n  unitGroupElement.addEventListener('click', () => {\n    selectedUnitGroup = selectedUnitGroup === 'metric' ? 'us' : 'metric';\n    loadWeather(selectedCity, selectedUnitGroup);\n  });\n\n  // Dark mode toggle\n  const darkModeElement = document.getElementById('dark-mode');\n  darkModeElement.addEventListener('click', () => {\n    document.body.classList.toggle('dark-mode');\n  });\n\n  // City search\n  const searchForm = document.querySelector('.search-box');\n  searchForm.addEventListener('submit', event => {\n    event.preventDefault();\n    const searchInput = document.getElementById('search-input');\n    selectedCity = searchInput.value;\n    loadWeather(selectedCity, selectedUnitGroup);\n  });\n});\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/* Root */\n:root {\n    --success-color: #28a745;\n    --info-color: #17a2b8;\n    --warning-color: #ffc107;\n    --danger-color: #dc3545;\n    --light-color: #f8f9fa;\n    --dark-color: #343a40;\n    --complementary-color: #ff7f50; /* Coral */\n    --text-color: #444444; /* Dark Charcoal */\n    --heading-color: #1a1a1a; /* Very Dark Gray */\n    --spacing-xsmall: 0.25rem;\n    --spacing-small: 0.5rem;\n    --spacing-medium: 1rem;\n    --spacing-large: 2rem;\n    --spacing-xlarge: 3rem;\n    --border-radius: 0.25rem;\n    --box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1); /* Subtle box shadow */\n    --transition: 0.3s;\n\n    /* Dark Mode Variables */\n    --dark-background-gradient: linear-gradient(135deg, #1a2a40, #233f5a, #3a5574, #516b8e); /* Mimics a night sky */\n    --dark-nav-background: #1a1a1a;\n    --dark-text-color: #f8f9fa; /* Light text */\n    --dark-heading-color: #ffffff; /* White text for headings */\n}\n\n/* Reset and box-sizing */\n*,\n*::before,\n*::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n/* Default Properties */\nbody, html {\n    font-family: 'Lato', sans-serif;\n    color: var(--text-color);\n    margin: 0;\n    height: 100vh; /* Ensure the body takes up the full height */\n    display: flex; /* Allows for flexbox centering */\n    flex-direction: column;\n    overflow: hidden; /* Prevent scrolling */\n    background: linear-gradient(135deg, #7ec8e3, #66b2ff, #99d6ff, #cce7ff); /* Background for both modes */\n}\n\nbody.dark-mode {\n    background: var(--dark-background-gradient);\n    color: var(--dark-text-color);\n}\n\nh1, h2, h3 {\n    color: var(--heading-color);\n    margin: 0;\n    font-family: 'Playfair Display', serif; /* Use Playfair Display for headings */\n}\n\nbody.dark-mode h1,\nbody.dark-mode h2,\nbody.dark-mode h3 {\n    color: var(--dark-heading-color);\n}\n\n/* Nav bar */\nheader {\n    background-color: var(--light-color);\n    color: var(--dark-color);\n    padding: var(--spacing-medium) 0;\n    text-align: center;\n}\n\nbody.dark-mode header {\n    background-color: var(--dark-nav-background);\n    color: var(--dark-text-color);\n}\n\nnav {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: var(--spacing-large);\n    padding: 0 var(--spacing-large); /* Add padding to ensure the nav contents have some space from the edges */\n    width: 100%;\n}\n\nnav a {\n    text-decoration: none;\n    color: var(--dark-color);\n    transition: color var(--transition);\n}\n\nbody.dark-mode nav a {\n    color: var(--dark-text-color);\n}\n\nnav a:hover,\nnav a:focus {\n    color: var(--complementary-color); /* Add hover and focus effect */\n}\n\n/* Logo */\n.logo {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.logo i {\n    font-size: 2rem;\n    color: var(--complementary-color);\n    margin-right: var(--spacing-xsmall);\n}\n\n.logo h2 {\n    margin: 0;\n    font-size: 1.5rem;\n    line-height: 1.2;\n}\n\n/* Search */\n.search-container {\n    flex: 1 1 auto; /* Allows the search container to grow and shrink as needed */\n    display: flex;\n    justify-content: center;\n}\n\n.search-box {\n    display: flex;\n    align-items: center;\n    background-color: white;\n    border-radius: 2rem;\n    box-shadow: var(--box-shadow);\n    padding: 0.25rem 0.5rem;\n    max-width: 400px;\n    width: 100%;\n}\n\nbody.dark-mode .search-box {\n    background-color: #333;\n    color: var(--dark-text-color);\n}\n\n.search-box input {\n    border: none;\n    outline: none;\n    flex: 1;\n    padding: 0.5rem;\n    font-size: 1rem;\n    border-radius: 2rem;\n}\n\n.search-box button {\n    background: none;\n    border: none;\n    cursor: pointer;\n    padding-left: 0.5rem;\n    transition: transform var(--transition);\n}\n\n.search-box button:hover,\n.search-box button:focus {\n    transform: scale(1.1); /* Add hover and focus effect */\n}\n\n.search-box button i {\n    font-size: 1.75rem;\n    color: var(--complementary-color);\n}\n\n.search-box input::placeholder {\n    color: var(--text-color);\n}\n\nbody.dark-mode .search-box input::placeholder {\n    color: var(--dark-text-color);\n}\n\nnav div {\n    margin: 0 var(--spacing-medium);\n}\n\n/* Switches */\n.switch-container {\n    display: flex;\n    align-items: center;\n}\n\n.switch-container i {\n    font-size: 1.75rem;\n    color: var(--complementary-color);\n    transition: color var(--transition);\n}\n\n.switch-container div {\n    margin-right: var(--spacing-small);\n    background-color: var(--light-color);\n    border-radius: 50%;\n    width: 2.5rem; /* Use rem for size */\n    height: 2.5rem;\n    cursor: pointer;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: background-color var(--transition), transform var(--transition), color var(--transition);\n}\n\n.switch-container div:hover,\n.switch-container div:focus {\n    background-color: var(--complementary-color);\n    transform: scale(1.1); /* Add hover and focus effect */\n}\n\n.switch-container div:hover i,\n.switch-container div:focus i {\n    color: var(--light-color); /* Change icon color on hover and focus */\n}\n\n/* Main */\nmain {\n    flex: 1;\n    display: grid;\n    grid-template-columns: 25% 50% 25%; /* Columns: 25%, 50%, 25% */\n    grid-template-rows: 1fr 1fr; /* Two equal rows */\n    gap: var(--spacing-medium); /* Optional: Adjust gap between grid items */\n    background: inherit; /* Inherit background from body */\n    overflow: hidden; /* Prevents main from causing scrollbars */\n}\n\nbody.dark-mode main {\n    background: inherit;\n}\n\n.grid-item.top.middle {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n}\n\n#city {\n    font-size: 2rem;\n}\n\n.grid-item.left,\n.grid-item.right {\n    grid-row: span 2; /* Outer columns span two rows */\n    padding: var(--spacing-medium);\n    color: var(--dark-color);\n}\n\nbody.dark-mode .grid-item.left,\nbody.dark-mode .grid-item.right {\n    color: var(--dark-text-color);\n}\n\n.grid-item.bottom.middle {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr); /* 7 equal columns for 7-day forecast */\n    gap: var(--spacing-small);\n    padding: var(--spacing-medium);\n}\n\n#forecast-container {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.forecast-item {\n    text-align: center;\n}\n\n.forecast-item img {\n    width: 40px; /* Adjust size as needed */\n    height: 40px;\n}\n\n#temp-container {\n    display: flex;\n    align-items: center;\n}\n\n#temp, #unitGroup {\n    font-size: 7.5rem;\n}\n\n#unitGroup {\n    color: var(--complementary-color);\n    font-size: 5rem;\n    align-self: flex-start;\n}\n\n\n/* Loading Spinner */\n.spinner {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    font-size: 3rem;\n    color: var(--complementary-color);\n}\n\n.hidden {\n    display: none;\n}\n\n/* 7 day forecast */\n.grid-item.bottom.middle {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr); /* 7 equal columns for 7-day forecast */\n    gap: var(--spacing-small);\n    padding: var(--spacing-medium);\n}\n\n.forecast-item {\n    text-align: center;\n    font-size: 0.875rem;\n    padding: var(--spacing-small);\n}\n\n.forecast-item img {\n    width: 40px; /* Adjust size as needed */\n    height: 40px;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://weather-app/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://weather-app/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;