const apiKey="b519b073de061051721cf997e13c4842"
const url=`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`
let data = {}
let weatherContainer = document.getElementById("weather")

fetch(url)
.then((response) => response.json()
)
.then((json) =>
{console.log(json)
data = json
weatherContainer.innerHTML = `
<div class="overview"
<p>Sunrise is at ${data.city.sunrise}</p>
<p>Sunset is at ${data.city.sunset}</p>
</div>
<div class="header">
<h1>Welcome to ${data.city.name}. Here's what the weather will be like this week:</h1>
</div>
<div class="week">
</div>
<div class="search">
</div>
`
/* Skickar veckodatan till "week"-klassen*/
let days = "<ul>" 
data.list.forEach(element => {
    days +=`<li>${element.dt_txt}</li>`
})
days += "</ul>"


document.querySelector(".week").innerHTML = days
})
