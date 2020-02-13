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
document.getElementById('killerImage').src = mystery.killer.image
========================================== 
*/

const today = document.getElementById('currentWeather')



//fetch
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=2b9468766d0e54560c7e599762d2e80b').then((response) => {
    return response.json()
}).then((json) => {
    console.log(json)
    let weatherObject = {
        name: json.weather[0].main,
        description: json.weather[0].description,
        temp: (json.main.temp - 273.15),
    }
    console.log("my object", weatherObject)
    const icons = {
        clouds: "media/clouds.svg",
        rain: "media/rain.svg",
        clear: "media/clear.svg"
    }

    const pictures = () => {
        console.log("inside function", weatherObject.name)
        let image = "blank"
        if (weatherObject.name === "Clouds") {
            image = icons.clouds
        }
        else if (weatherObject.name === "Rain") {
            image = icons.rain
        }
        else if (weatherObject.name === "Clear") {
            image = icons.clear
        }
        else if (weatherObject.name === "Snow") {
            image = icons.rain
        }
        console.log("image", image)
        return image
    }
    console.log(weatherObject)

    today.innerHTML += `<h1> The city is ${json.name}</h1>`
    today.innerHTML += `<p> Weather ${json.weather[0].main} the description ${json.weather[0].description} icon ${json.weather[0].icon} </p>`
    const todayWeather = [json.main.temp, json.main.feels_like, json.main.temp_min, json.main.temp_max]
    document.getElementById('todayIcon').src = pictures()
    console.log(todayWeather)
    console.log(json.weather[0])


})

