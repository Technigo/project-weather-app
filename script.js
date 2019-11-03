//window.addEventListener("load", () => {
let long;
let lat;
const temperatureDescription = document.querySelector(".temperature-description");
const temperatureDegree = document.querySelector(".temperature-degree");
const temperatureMinMax = document.querySelector(".todaysTempMinMax");
const locationTimezone = document.querySelector(".location-timezone");
const theSunset = document.querySelector(".sunset-time");
const theSunrise = document.querySelector(".sunrise-time");
const theDayDate = document.querySelector(".day-date");
const theDayTemp = document.querySelector(".day-temp");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8cbd9193bf1986e2387d169ac2d73a9e`;
        //const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8cbd9193bf1986e2387d169ac2d73a9e`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                const name = json.name;
                const temp = json.main.temp;
                const tempMin = json.main.temp_min;
                const tempMax = json.main.temp_max;
                const description = json.weather[0].description;
                const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString(
                    [], { hour: "2-digit", minute: "2-digit" }
                );
                const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                });

                //Set DOM Elemens from the API'
                temperatureMinMax.innerHTML = `min: ${tempMin.toFixed(1)} C° / max: ${tempMax.toFixed(1)} C°`;
                temperatureDegree.innerHTML = `${temp.toFixed(1)} C`;
                temperatureDescription.innerHTML = description;
                locationTimezone.innerHTML = `${name}`;
                theSunrise.innerHTML = `Sunrise: ${sunrise}`;
                theSunset.innerHTML = `Sunset: ${sunset}`;
            });
    });
    } else {
        //does not work?..
        //h1.innerHTML = "Geolocation is not supported by this browser.";
    }

// 5 DAY FORECAST - NEW API LINK
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8cbd9193bf1986e2387d169ac2d73a9e`;

        fetch(apiForecast)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                const dayDate = json.list.main.humidity;

                theDayDate.innerHTML += dayDate;
            });
    });
} else {
    //does not work?..
    //h1.innerHTML = "Geolocation is not supported by this browser.";
}
//});