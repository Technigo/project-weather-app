const weatherWelcome = document.getElementById('weather-report-welcome')
const container = document.getElementById('weather-report')
const weatherInformation = document.getElementById('weather-report-information')
const weatherExtra = document.getElementById('weather-report-extra')

//We fetch from the API
	fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=cf8bebc980e071b00ce71572ff7c60ec')

//We get the JSON from the API
	.then((response) => {
	return response.json()
	})

//And then with the JSON from the API we start creating HTML inside of the container, which we selected in the beginning. 
	
    .then((json) =>{ 
        //console.log(json)
        weatherWelcome.innerHTML = `<h1>Today </h1>`
        weatherWelcome.innerHTML += `<h2>in ${json.name} in ${json.sys.country}</h2>`
            
        let tempNoDecimals = json.main.temp
        let tempNoDecimals2 = tempNoDecimals.toFixed(1) 
            weatherWelcome.innerHTML += `<p> it's ${tempNoDecimals2} °C</p>`
    	
	    container.innerHTML = `<p>and ${json.weather[0].description}.</p>`
        
        
        let sunriseTime = json.sys.sunrise
        let sunriseTime2 = new Date(sunriseTime).toLocaleTimeString() 
            weatherInformation.innerHTML = `<p>The sun will rise at ${sunriseTime2} am</p>`
        
        let sunsetTime = json.sys.sunset
        let sunsetTime2 = new Date(sunsetTime).toLocaleTimeString() 
            weatherInformation.innerHTML += `<p>and it will set at ${sunsetTime2} pm.</p>`    

            weatherExtra.innerHTML = `<h3>Have a nice day!</h3>`
    })
    
    


