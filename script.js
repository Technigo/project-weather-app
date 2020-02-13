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
   var date = new Date(1546108200 * 1000);
    console.log(date.toUTCString())
    var fixed = rounded.toFixed(1);
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
        temp: (json.main.temp - 273.15).toFixed(1),
        date: (new Date(json.dt * 1000)).toUTCString()
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
    today.innerHTML += `<p> Weather ${json.weather[0].main} the description ${json.weather[0].description} <br> today ${weatherObject.date} temperature ${weatherObject.temp} </p>`
    const todayWeather = [json.main.temp, json.main.feels_like, json.main.temp_min, json.main.temp_max]
    document.getElementById('todayIcon').src = pictures()
    console.log(todayWeather)
    console.log(json.weather[0])

})
// fetch 5 -days
// api.openweathermap.org/data/2.5/forecast?q=London&appid=2b9468766d0e54560c7e599762d2e80b
fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=2b9468766d0e54560c7e599762d2e80b').then((response) => {
    return response.json()
}).then((jsonweek) => {
    console.log('week', jsonweek)
    console.log("day1", jsonweek.list[0])

    const myFunc = () => {
        let dayListWeather = []
        jsonweek.list.forEach((item) => {
            dayListWeather.push({ name: item.weather[0].main, description: item.weather[0].description, temp: (item.main.temp - 273.15), date: item.dt_txt, wind: item.wind.speed })

        })
        return dayListWeather

    }
    const newArr = myFunc()
    console.log(newArr)
})


// console.log(moreAboutPokemons);
// const newArray = moreAboutPokemons.map(val => {
//   return val.name;
// });
// console.log(newArray);