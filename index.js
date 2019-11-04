const city = document.getElementById("city");
const weatherIcon = document.getElementById("weather_icon");
const temp = document.getElementById("temp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weekdays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=da417ece928b0291f06b75fca4777157"
  )
  .then(response => {
    return response.json();
  })

  .then(json => {
    console.log(json);
    let sunRise = new Date(json.city.sunrise * 1000);
    let sunSet = new Date(json.city.sunset * 1000);

    city.innerHTML = json.city.name;

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric"
    }
    const newDate = new Date(json.list[0].dt_txt)
    const todayDate = newDate.toLocaleDateString("en-US", options)

    document.getElementById("date").innerHTML = `${todayDate}`

    weather_icon.src = `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png`
    temp.innerHTML = `${getNumber(Math.round(json.list[0].main.temp))}&deg;C`;

    sunrise.innerHTML = `${("0" + sunRise.getHours()).slice(-2)}:${("0" + sunRise.getMinutes()).slice(-2)}`;
    sunset.innerHTML = `${("0" + sunSet.getHours()).slice(-2)}:${("0" + sunSet.getMinutes()).slice(-2)}`;

    // Creates an array with the days (at 12:00) which should be displayed
    let dayArray = []
    json.list.forEach(day => {
      let date = new Date(day.dt_txt);
      if (date.getHours() == "12") {
        dayArray.push(day)
      }
    })

    displayDays(dayArray)
  })

// Function that creates the 
const displayDays = (dayArray) => {
  const weekdaysDiv = document.getElementById("weekdays");
  for (i = 0; i < dayArray.length; i++) {
    console.log(dayArray[i])
    let currentDate = new Date(dayArray[i].dt_txt)
    let currentDay = currentDate.getDay()
    weekdaysDiv.innerHTML += `<div class="week_days"> 
                                <div>${weekdays[currentDay]}</div>
                                  <img src="https://openweathermap.org/img/wn/${dayArray[i].weather[0].icon}.png">
                                <div>${getNumber(Math.round(dayArray[i].main.temp))}&deg;C </div>
                              </div>`
  }
}
//  Function to add a '+' in front of positive numbers
const getNumber = (theNumber) => {
  if (theNumber > 0) {
    return "+" + theNumber;
  } else {
    return theNumber.toString();
  }
}