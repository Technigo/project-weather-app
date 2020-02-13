//container


//fetch
/* 
========================================== 
const container = document.getElementById('astros')
fetch('http://api.open-notify.org/astros.json').then((response)=>{
    return response.json()
}).then((json) =>{
    console.log(json)
    container.innerHTML =`<h1> There are ${json.number} people in space</h1>`
json.people.forEach(element => {
    container.innerHTML += `<p>${element.name} is on craft ${element.craft}</p> `
});

})
========================================== 
*/

const today = document.getElementById('currentWeather')

//fetch
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=2b9468766d0e54560c7e599762d2e80b').then((response)=>{
    return response.json()
}).then((json) =>{
    console.log(json)
    today.innerHTML =`<h1> The city is ${json.name}</h1>`
    today.innerHTML +=`<p> Weather ${json.weather[0].main} the description ${json.weather[0].description} icon ${json.weather[0].icon} </p>`
    const todayWeather =[json.main.temp, json.main.feels_like, json.main.temp_min, json.main.temp_max]
    console.log(todayWeather)
    console.log(json.weather[0])


})
