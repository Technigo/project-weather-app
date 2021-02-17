const container = document.getElementById('container');
const weekdaysContainer = document.getElementById('weekdays');
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=ad72cba3e69f19b6bfee096375f2b3f9";
const apiFiveDaysUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=ad72cba3e69f19b6bfee096375f2b3f9";
fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
        
    .then((json) => {
        // console.log(json)
        let iconSrc = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        const sunset=new Date((json.sys.sunset + json.timezone) * 1000).toLocaleString("se-SE", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
        const sunrise=new Date((json.sys.sunrise + json.timezone) * 1000).toLocaleString("se-SE", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
        container.innerHTML += `
            <div>${json.name}</div>
            <div>Temp:${Math.round(json.main.temp)}</div>
            <div>${json.weather[0].description}</div>
            <img src=${iconSrc} />
            <div>Feels like:${Math.round(json.main.feels_like)}</div>
            <div>sunrise:${sunrise}</div>
            <div>sunset:${sunset}</div>
        `

    });
fetch(apiFiveDaysUrl)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        filteredForecast.forEach((item) => {
            let iconSrc = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            console.log(item);
            let weekday = new Date(item.dt_txt).toLocaleString('en-US', {
                weekday: "short"
            });
            
            weekdaysContainer.innerHTML += `
                <div class="weekdays-container">
                    <div>${weekday}</div>
                    <div>${Math.round(item.main.temp_max)}</div>
                    <div>${Math.round(item.main.temp_min)}</div>
                    <img src=${iconSrc} />
                </div>

            `
        })

    })
    
    