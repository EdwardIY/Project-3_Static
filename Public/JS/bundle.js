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

/***/ "./Source/JS/index.ts":
/*!****************************!*\
  !*** ./Source/JS/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CSS_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CSS/index.css */ \"./Source/CSS/index.css\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar loader = document.getElementById('loader');\nvar btn = document.querySelector('.btn');\nvar myLocation = document.querySelector('.myLocation');\nvar searchInput = document.querySelector('.input');\nvar week = document.getElementById('week');\nvar time = document.getElementById('time');\nvar fullDate = document.getElementById('fullDate');\nvar months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\nvar days = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\nvar mainCard = {\n  location: document.getElementById('location'),\n  des: document.getElementById(\"descriptionInput\"),\n  temp: document.getElementById(\"tempInput\"),\n  feels: document.getElementById(\"feelsInput\"),\n  hum: document.getElementById(\"humidityInput\"),\n  windS: document.getElementById(\"wSpeedInput\")\n};\nvar backG_details = [];\nvar backG = document.getElementById('img');\n\n// LOADER\nfunction activateLoader() {\n  loader.style.opacity = \"1\";\n  loader.style.zIndex = \"2\";\n}\nfunction disableLoader() {\n  loader.style.opacity = \"0\";\n  loader.style.zIndex = \"0\";\n}\n\n// SEARCH OPTIONS\nmyLocation.addEventListener(\"click\", function () {\n  // activateLoader()   // TURN ON LOADER\n  navigator.geolocation.getCurrentPosition(function (position) {\n    var lat = position.coords.latitude;\n    var _long = position.coords.longitude;\n    getWeek(\"myP\", lat, _long);\n  });\n});\nbtn.addEventListener(\"click\", function () {\n  getWeek(\"searched\", searchInput.value);\n  activateLoader(); // TURN ON LOADER\n});\n\ndocument.addEventListener(\"keydown\", function (e) {\n  if (e.key == \"Enter\") {\n    getWeek(\"searched\", searchInput.value);\n    activateLoader(); // TURN ON LOADER\n  }\n});\n\nfunction clock() {\n  var currentDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();\n  var date = currentDate;\n  var timeString = date.toLocaleTimeString();\n  time.textContent = timeString.split(\":\")[0] + \":\" + timeString.split(\":\")[1] + timeString.slice(-3);\n  fullDate.textContent = days[date.getDay()] + \", \" + date.getDate() + \" \" + months[date.getMonth()];\n  if (backG_details.length == 0) backG_details.push(timeString.slice(-2));\n}\nvar setClock = setInterval(clock, 1000);\nvar setNewTime; // Timer holder for searched location\nfunction getWeek(option, pointOne, pointTwo) {\n  backG_details = []; // Clear time & weather details for background image\n  week.style.opacity = \"1\"; // Make week visible \n  week.innerHTML = \"\"; // Clear week\n\n  var searchOne = \"\";\n  var searchTwo = \"\";\n  if (option == \"myP\") {\n    searchOne = \"https://api.openweathermap.org/data/2.5/weather?lat=\".concat(pointOne, \"&lon=\").concat(pointTwo, \"&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial\");\n    searchTwo = \"https://api.openweathermap.org/data/2.5/forecast?lat=\".concat(pointOne, \"&lon=\").concat(pointTwo, \"&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial\");\n  }\n  if (option == \"searched\") {\n    searchOne = \"https://api.openweathermap.org/data/2.5/weather?q=\".concat(pointOne, \"&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial\");\n    searchTwo = \"https://api.openweathermap.org/data/2.5/forecast?q=\".concat(pointOne, \"&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial\");\n  }\n  fetch(searchOne).then(function (re) {\n    return re.json();\n  }).then(function (data) {\n    if (data.cod != 200) throw Error(\"Location not found..\");\n    mainCard.location.textContent = data.name;\n    mainCard.des.textContent = _toConsumableArray(data.weather).pop().description[0].toUpperCase() + _toConsumableArray(data.weather).pop().description.slice(1);\n    mainCard.temp.textContent = data.main.temp + \" °F\";\n    mainCard.feels.textContent = data.main.feels_like + \" °F\";\n    mainCard.hum.textContent = data.main.humidity + \"%\";\n    mainCard.windS.textContent = data.wind.speed + \"mph\";\n    backG_details.push(_toConsumableArray(data.weather).pop().description);\n  }).then(function () {\n    fetch(searchTwo).then(function (res) {\n      return res.json();\n    }).then(function (data) {\n      var list = data.list.filter(function (x) {\n        var time = new Date(x.dt * 1000).toLocaleString().split(\", \")[1];\n        if (time == '5:00:00 PM' || time == '11:00:00 AM') return true;\n      });\n      var dayCount = 1;\n      var weekList = [];\n      for (var _time = 0; _time < list.length; _time += 2) {\n        weekList.push([_toConsumableArray(list).splice(_time, 2)]);\n      }\n      weekList.forEach(function (x, i) {\n        var date = new Date();\n        if (i == 0) {\n          console.log(x);\n          week.innerHTML += \"\\n                    <div class=\\\"currentDay\\\">\\n                        <img src=\\\"http://openweathermap.org/img/wn/\".concat(x[0][0].weather[0].icon, \"@2x.png\\\" alt=\\\"\\\">\\n                        <div class=\\\"info\\\">\\n                            <span>\").concat(days[date.getDay() + dayCount].slice(0, 3), \"</span>\\n                            <span><b>Mid-Day</b> - \").concat(x[0][0].main.temp, \" \\xB0F</span>\\n                            <span><b>Afternoon</b> - \").concat(x[0][1].main.temp, \" \\xB0F</span>\\n                        </div>\\n                    </div>\\n\\n                    \");\n        } else {\n          week.innerHTML += \"\\n                    <div class=\\\"day\\\">\\n                        <span>\".concat(days[date.getDay() + dayCount].slice(0, 3), \"</span>\\n                        <img src=\\\"http://openweathermap.org/img/wn/\").concat(x[0][0].weather[0].icon, \"@2x.png\\\" height:50px; width:50px; alt=\\\"\\\">\\n                        <span><b>Mid-Day</b> - \").concat(x[0][0].main.temp, \"\\xB0F</span>\\n                        <span><b>Afternoon</b> - \").concat(x[0][1].main.temp, \"\\xB0F</span>\\n                    </div>\\n                    \");\n        }\n        dayCount++;\n      });\n      clearInterval(setClock); // Clear clock for base location\n\n      clearInterval(setNewTime); // Clear clock for past search location\n\n      getTime(data); // Initial new time based searched location\n\n      setNewTime = setInterval(function () {\n        // Start clock for searched location\n        getTime(data);\n      }, 60000);\n    });\n  })[\"catch\"](function (err) {\n    // Clear today card\n    mainCard.location.textContent = '. . .';\n    mainCard.des.textContent = '. . .';\n    mainCard.temp.textContent = '. . .';\n    mainCard.feels.textContent = '. . .';\n    mainCard.windS.textContent = '. . .';\n    mainCard.hum.textContent = '. . .';\n\n    // Clear week \n    week.style.opacity = \"0\";\n\n    // Handle error in search input\n    searchInput.value = err.message;\n    searchInput.style.opacity = '.5';\n    setTimeout(function () {\n      searchInput.value = \"\";\n      searchInput.style.opacity = \"initial\";\n    }, 1500);\n    disableLoader(); // TURN LOADER OFF\n  });\n}\n\nfunction getTime(data) {\n  fetch(\"https://api.ipgeolocation.io/timezone?apiKey=957a47b3088a40a8a20879acaf412420&lat=\".concat(data.city.coord.lat, \"&long=\").concat(data.city.coord.lon)).then(function (res) {\n    return res.json();\n  }).then(function (data) {\n    clock(new Date(data.date_time_ymd.slice(0, -5)));\n    var timeString = new Date().toLocaleTimeString().slice(-2);\n    if (backG_details.length == 1) backG_details.unshift(timeString);\n    getBackG(backG_details, new Date(data.date_time_ymd.slice(0, -5)).toLocaleTimeString());\n  });\n}\nfunction getBackG(data, time) {\n  if (screen.width <= 425) {\n    disableLoader();\n    return;\n  }\n  time = time.split(\":\");\n  var images = ['url(./Public/images/Night/clear.jpg)', 'url(./Public/images/Night/cloud.jpg)', 'url(./Public/images/Night/rain.jpg)', 'url(./Public/images/Night/snow.jpg)', 'url(./Public/images/Day/clear.jpg)', 'url(./Public/images/Day/cloud.jpg)', 'url(./Public/images/Day/rain.jpg)', 'url(./Public/images/Day/snow.jpg)', 'url(./Public/images/Afternoon/clear.jpg)', 'url(./Public/images/Afternoon/cloud.jpg)', 'url(./Public/images/Afternoon/rain.jpg)', 'url(./Public/images/Afternoon/snow.jpg)'];\n  var time_One;\n  var time_Two = time[2].slice(-2);\n  if (time_Two == \"AM\" && +time[0] == 12 || time_Two == \"AM\" && +time[0] < 6) time_One = \"Night\";else if (time_Two == \"PM\" && +time[0] == 12 || time_Two == \"PM\" && +time[0] <= 3) time_One = \"Day\";else if (time_Two == \"AM\" && +time[0] >= 6) time_One = \"Day\";else if (time_Two == \"PM\" && +time[0] > 3 && time_Two == \"PM\" && +time[0] <= 6) time_One = \"Afternoon\";else if (time_Two == \"PM\" && +time[0] > 6) time_One = \"Night\";\n  backG.style.backgroundImage = images.filter(function (x) {\n    var weather = x.slice(0, -5).split(\"/\").reverse()[0];\n    var time = x.slice(0, -5).split(\"/\").reverse()[1];\n    if (data[1].includes(weather) && time == time_One) {\n      return true;\n    }\n  });\n  if (backG.style.backgroundImage.length == 0) {\n    backG.style.backgroundImage = 'url(./Public/images/Atmosphere/fog.jpg)';\n  }\n  disableLoader(); // TURN LOADER OFF\n}\n\n//# sourceURL=webpack://weather-app-2.0/./Source/JS/index.ts?");

/***/ }),

/***/ "./Source/CSS/index.css":
/*!******************************!*\
  !*** ./Source/CSS/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://weather-app-2.0/./Source/CSS/index.css?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./Source/JS/index.ts");
/******/ 	
/******/ })()
;