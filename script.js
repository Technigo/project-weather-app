const container = document.getElementById('forcast')




fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3492ebb354e19f61676ca7b4ced6d196')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        const temperature = json.main.temp;

        const description = json.weather[0].description;

        const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timestamp = new Date(json.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        container.innerHTML = `<p>${json.name}  ${temperature} ${description} ${sunrise} 
        ${sunset} ${timestamp}</p >`
    })


