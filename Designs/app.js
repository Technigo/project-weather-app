const apiKey = '6ce5bf72d646ddeec36c25915a5c0762'

const container = document.getElementById('weatherInfo')

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Gamleby,Sweden&units=metric&APPID=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        container.innerHTML = `<h1> It is currently ${json.main.temp}°C in Gamleby right now</h1>`
    })


// ## Step **2 - Present some data on your web app.**

// Your task is to present the data: the city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)



// ## Step **3 - Sunrise and sunset 🌇**

// Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM).

// You will have to **format the date from milliseconds to a readable format**.

// [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) is a useful resource for how to do this.

// weekdays = short long 

// //select the container and run the API request. 
// const container = document.getElementById('astros')

// fetch('http://api.open-notify.org/astros.json')
//     .then((response) => {
//         return response.json()
//     })
//     .then((json) => {
//         container.innerHTML = `<h1> There are ${json.number} people in space right now </h1>`

//         json.people.forEach((person) =>{
//             container.innerHTML += `<p> ${person.name} is on the ${person.craft} </p>`
//         })
//     })

