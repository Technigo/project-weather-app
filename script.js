// Api 
const API = 'https://api.openweathermap.org/data/2.5/weather?q=Amsterdam,Netherlands&units=metric&appid=26500228b15aa40fc0617041c68bf843'


fetch (API)
.then ((response) => {
    return response.json ()
})
.then ((json) => {

const description = json.weather[0].description

 description.innerHTML = `
 <p> ${description} | </p>`

 const temperature= json.main.temp 
 console.log (temperature)

 container.innerHTML=`<h1> ${temperature} /<h1>`

 
})
