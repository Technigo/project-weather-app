// Main placeholder for the whole weather app
const wrapperContainer = document.getElementById("wrapper-container");
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// Main container for todays weather forcast
const weatherContainer = document.createElement("section");
// https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
wrapperContainer.prepend(weatherContainer);
// Assigning a class to HTLM element
weatherContainer.className = "weather-container";
// Container for next 5 days weather forcast
const weekdayContainer = document.createElement("section");
// https://developer.mozilla.org/en-US/docs/Web/API/Element/append
wrapperContainer.append(weekdayContainer);
// Assigning a class to HTLM element
weekdayContainer.className = "weekday-container";
