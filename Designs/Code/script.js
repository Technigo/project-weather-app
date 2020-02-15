

const cityName = document.getElementById('city')
const cityTemp = document.getElementById('temp')
const cityDescript =document.getElementById('Descript')


fetch('http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&APPID=bb2b0bb45cd18a1f48ff2ac55b77750a')
.then((Response) => {
    return Response.json()
})
.then((json) => {

    cityName.innerHTML = json.name 
    cityTemp.innerHTML = `<p> Temp: ${json.main.temp.toFixed(0)} &#8451; </p>`
    cityDescript.innerHTML = json.weather[0].description


})

