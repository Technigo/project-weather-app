// Dom Section
const tempElement = document.getElementById("temp")


fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=64dc0a4bc655c3566178e4cae018559e")

.then((response)=>{
    return response.json()
})
.then ((data) =>{
    console.log(data)
    console.log(data.name)
    console.log(data.main.temp)
    console.log(data.wind.speed)
    console.log(data.weather[0].description)
    tempElement.innerHTML = data.main.temp;

    

   
})
.catch ((err) => {
    console.log(err)
})

