//DOM selectors
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')



//Fetching the API
const fetchSun = () => {
	fetch(
		'https://api.openweathermap.org/data/2.5/weather?q=Umea,Sweden&units=metric&APPID=1e48fdf267ccc8ee33c1c78150dcbab1'
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			// variabel för data i sekunder från json
			const sunriseSeconds = data.sys.sunrise
			const sunsetSeconds = data.sys.sunset
			console.log('seconds', data.sys.sunrise)
			console.log('seconds', data.sys.sunset)
            
            const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
	            hour: '2-digit',
	            minute: '2-digit',
            })

            const set = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
	            hour: '2-digit',
	            minute: '2-digit',
            })

			sunrise.innerText = `${rise} `
			sunset.innerText = `${set}`
			 
		})
}
fetchSun()
