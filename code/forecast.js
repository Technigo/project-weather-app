//DOM selectors


//Fetching the API
const fetchForecast = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)

			
		})
}
fetchForecast()

/*
const nameChoice = data.name
const tempChoice = Math.trunc(data.main.temp)
const weatherDescr = data.weather[0].description

console.log(weatherDescr)

handleName.innerText = nameChoice
handleTemp.innerText = `${tempChoice} °C`
weatherDescription.innerText = `${weatherDescr}`
*/