//DOM selectors
const handleForecast = document.getElementById('forecast-list')

//Fetching the API
const fetchForecast = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/forecast?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((forecast) => {
			let filteredForecast = forecast.list.filter((day) =>
				day.dt_txt.includes('12:00')
			)

			handleForecast.innerHTML = ''

			filteredForecast.forEach((day) => {
				const weekTemp = day.main.temp.toFixed(0)
				const shortWeekDays = [
					'sun',
					'mon',
					'tue',
					'wed',
					'thu',
					'fri',
					'sat',
					'sun',
					'mon',
					'tue',
					'wed',
					'thu',
					'fri',
				]

				let weekday = new Date()
				let today = weekday.getDay()
				let tomorrow = today + 1

                //insert picture for cloud/sun/rain?
				handleForecast.innerHTML += `
                <div id="forecast-list">
                <p>${new Date(day.dt_txt.replace(/-/g, '/')).toLocaleDateString(
									'en-US',
									{
										weekday: 'short',
									}
								)} 
                </p>
                <p id="weekTemp">${weekTemp}ºC</p>
                ${[day.weather[0].main]}
                </div>
                `

				console.log(filteredForecast)
				//skapa lista över fyra dagar fram. temp kl 12.00
				//skapa funktion som filtrerar ut värden från object i array
			})
		})
}
fetchForecast()

//  destinations.forEach((dest) => {
//     destinationDiv.innerHTML += `
//     <div class="container">
//       <div class="text-above"><h4>${dest.name}<br><span>${dest.country}</span></div>
//       <div class="img-container"><img src="${dest.image}"></div>
//       <ul>.
//         <li>Language: ${dest.language}</li>
//         <li>Accessibility: ${dest.accessibility}</li>
//         <li>Temperature: ${dest.temperature}ºC</li>
//         <li>Rating: ${dest.rating}/5</li>
//       </ul>
//       <div class="description-text"><p>${dest.description}</p></div>
//       </div>
//     `
//     })
// }

/*
const nameChoice = data.name
const tempChoice = Math.trunc(data.main.temp)
const weatherDescr = data.weather[0].description

console.log(weatherDescr)

handleName.innerText = nameChoice
handleTemp.innerText = `${tempChoice} °C`
weatherDescription.innerText = `${weatherDescr}`
*/
