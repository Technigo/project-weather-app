
let weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

fetch("http://api.openweathermap.org/data/2.5/forecast?q=karlstad,SWE&units=metric&appid=81d357180ff563fe7c461222930c95a7") 

  .then((response) => {
    return response.json()
  })

.then((json) => {
  console.log(json)
// today's forecast 
  let sunriseDateTime = new Date(json.city.sunrise * 1000);
  let sunsetDateTime = new Date(json.city.sunset * 1000);

  document.getElementById("cityName").innerHTML = `<h2>${json.city.name}</h2>`;
  document.getElementById("temperature").innerHTML += `<p>${json.list[0].main.temp}°c </p>`

 
  document.getElementById("weatherConditions").innerHTML += `<p>${json.list[0].weather[0].description}</p>`;
  document.getElementById("weatherConditionsImage").src = `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png`

  document.getElementById("sunrise").innerHTML += `<p>${sunriseDateTime.getHours()}:${sunriseDateTime.getMinutes()}</p>`;
  
  document.getElementById("sunset").innerHTML += `<p>${sunsetDateTime.getHours()}:${sunsetDateTime.getMinutes()}</p>`;
 
// this week's forecast

const filteredJson = json.list.filter(item => item.dt_txt.includes('12:00')) // each days' weather att noon
console.log(filteredJson)

document.getElementById("day1").innerHTML = `${getDayOfWeek(filteredJson[0].dt)}`
document.getElementById("day2").innerHTML = `${getDayOfWeek(filteredJson[1].dt)}`
document.getElementById("day3").innerHTML = `${getDayOfWeek(filteredJson[2].dt)}`
document.getElementById("day4").innerHTML = `${getDayOfWeek(filteredJson[3].dt)}`
document.getElementById("day5").innerHTML = `${getDayOfWeek(filteredJson[4].dt)}`

document.getElementById("tempDay1").innerHTML = `${+filteredJson[0].main.temp.toFixed(1)}°c`
document.getElementById("tempDay2").innerHTML = `${+filteredJson[1].main.temp.toFixed(1)}°c`
document.getElementById("tempDay3").innerHTML = `${+filteredJson[2].main.temp.toFixed(1)}°c`
document.getElementById("tempDay4").innerHTML = `${+filteredJson[3].main.temp.toFixed(1)}°c`
document.getElementById("tempDay5").innerHTML = `${+filteredJson[4].main.temp.toFixed(1)}°c`
 
//   json.list.forEach((day) => {
//   //  console.log(day);
       
//    document.getElementById("weatherConditions").innerHTML = `<p>${day.weather[0].description}</p>`;
  
       
//  })
})

const getDayOfWeek = (param) => {
  let date = new Date (param * 1000);

  let specificDay = date.getDay();
  
return weekdays[specificDay];
}

console.log(weekdays)
