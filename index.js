
const todaysWeatherId = document.getElementById("todaysWeatherId");
const todaysImage = document.getElementById("todaysImage")

const fetchWeatherToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f2f9f8b681a8d2ef3cd9a12ebdc8c363';
fetch(fetchWeatherToday)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        const todaysImageId = json.weather[0].icon;
        todaysImage.src = `./images/${todaysImageId}.gif`;

        todaysWeatherTemp.innerText = Math.round(json.main.temp) + "°C";

        todaysWeatherCity.innerText = json.name;

        todaysWeatherType.innerText = json.weather[0].description;

        todaysWeatherSunrise.innerText = formatTime(json.sys.sunrise);
        todaysWeatherSunset.innerText = formatTime(json.sys.sunset);
    });

const formatTime = (unixtime) => {
    console.log(unixtime);
    const date = new Date(unixtime * 1000)
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;



};


//STEP 4
const nextWeeksWeatherId = document.getElementById('nextWeeksWeatherId');
const fetchWeatherNextWeek = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f2f9f8b681a8d2ef3cd9a12ebdc8c363';

const nextWeeksWeatherInfoAPI = () => {
    fetch(fetchWeatherNextWeek)
    .then((response) => {
        return response.json()
    })
    .then((nextWeeksWeatherInfo) => {
        const filteredList = nextWeeksWeatherInfo.list.filter(item => item.dt_txt.includes('12:00'));

        for (let i=0; i < filteredList.length; i++) {
            const day = new Date(filteredList[i].dt * 1000);
            var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
            const finalDay = days[day.getDay()];
            document.getElementById(`day${i+1}Day`).innerHTML = `${finalDay}`;

            const icon = filteredList[i].weather[0].icon;
            document.getElementById(`day${i+1}Image`).src = `./images/${icon}.gif`;

            const temp = filteredList[i].main.temp.toFixed(1);
            document.getElementById(`day${i+1}Temp`).innerHTML = `${temp}&#176`;

        };
    });
};
    nextWeeksWeatherInfoAPI();