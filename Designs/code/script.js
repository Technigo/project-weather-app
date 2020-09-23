//Todays weather api
const apiLysekilToday = "https://api.openweathermap.org/data/2.5/weather?q=Lysekil,Sweden&units=metric&APPID=de78a234a90e490fde95f979d2491105";
console.log(apiLysekilToday);

//Forecast api
const apiLysekilForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Lysekil&appid=de78a234a90e490fde95f979d2491105";
console.log(apiLysekilForecast);

/*let weatherImage = (icon) => {
if (icon > 800)
    let figure = 'Design-2/icons/noun_Cloud_1188486.svg';
    return figure;

} else {
    let figure = 'Design-2/icons/noun_Umbrella_203053';
}
};*/

/*let backgroundColor = (icon) => {
    if (icon < 500){
    document.body.style.backgroundColor = 'orange';
    return figure;
}  
    else { 
    document.body.style.backgroundColor = 'lightblue';
    return figure;
}
};*/

//Todays weather api  
fetch(apiLysekilToday).then((response) => {
    return response.json()
}).then((json) => {
    console.log(json)

    todaysLysekil.innerHTML = `<h2>In ${json.name} there are ${json.main.temp}° and ${json.weather[0].description} today.</h2>`;

        let sunrise = (new Date(json.sys.sunrise * 1000).toLocaleTimeString("en-US", { timeStyle: "short" }));
        let sunset = (new Date(json.sys.sunset * 1000).toLocaleString("en-US", { timeStyle: "short" }));

    daytime.innerHTML = `Sunset ${sunrise} Sunset ${sunset}`;

    coloringFunction = () => {
                    if (json.main.temp > 30.0) {
                            document.body.style.backgroundColor =  "#ed743b";
                    } else if (json.main.temp > 20.0) {
                            document.body.style.backgroundColor = "#deb045";
                    } else if (json.main.temp > 10.0) {
                            document.body.style.backgroundColor =  "#56d6b2";
                    } else if  (json.main.temp > 0.0) {
                            document.body.style.backgroundColor = "#51c9b7";
                    } else if (json.main.temp < 0.0) {
                            document.body.style.backgroundColor = "#72c8db";
                    } else {
                            document.body.style.backgroundColor =  "#e84a2e";
                    }
                };
    coloringFunction();
})

//Forecast api
fetch(apiLysekilForecast).then((response) => {
    return response.json()
})
    .then((forecast) => {
        console.log(forecast)
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'))

        console.log(filteredForecast)
        filteredForecast.forEach(item => {
            let temperature = (item.main.temp - 273.15).toFixed(1);
            var icon = item.weather[0].id;
            let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", { weekday: "short" })

           // let figure = backgroundColor(icon);
            forecastLysekil.innerHTML += `<p>${weekday} ${temperature}&#8451;</p>`;

        });
    });