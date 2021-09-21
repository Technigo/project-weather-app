// Main placeholder for the whole weather app
const wrapperContainer = document.getElementById("wrapper-container");
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
// Main container for todays weather forecast
const weatherContainer = document.createElement("section");
// https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
wrapperContainer.prepend(weatherContainer);
// Assigning a class to HTLM element
weatherContainer.className = "weather-container";
// Container for next 5 days weather forecast
const weekdayContainer = document.createElement("section");
// https://developer.mozilla.org/en-US/docs/Web/API/Element/append
wrapperContainer.append(weekdayContainer);
// Assigning a class to HTLM element
weekdayContainer.className = "weekday-container";

// The generic rendering function for drawing the weakday container information
const renderAll = (a, b, c) => {
  const weekDayRow = document.createElement("div");
  weekDayRow.className = "weekday-row";
  weekdayContainer.append(weekDayRow);
  const weekDay = document.createElement("div");
  const weatherEmoji = document.createElement("div");
  const weekDayTemp = document.createElement("div");
  weekDay.className = "forecast-content";
  weatherEmoji.className = "forecast-content";
  weekDayTemp.className = "forecast-content";
  weekDayRow.append(weekDay, weatherEmoji, weekDayTemp);
  weekDay.innerHTML = `${a}`;
  weatherEmoji.innerHTML = `${b}`;
  weekDayTemp.innerHTML = `${c}`;
};

renderAll("monday", "emoji", "12 C /25 C");
renderAll("tue", "emoji", "18 C /45 C");
renderAll("mwed", "emoji", "19 C /25 C");
renderAll("thuers", "emoji", "10 C /25 C");
renderAll("friday", "emoji", "30c / 34c");
