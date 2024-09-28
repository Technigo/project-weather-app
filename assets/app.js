const apiKey = '814d96ad744ce195b2f067b83d92321c';
const city = 'Lausanne';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// Fonction pour récupérer les données météo
async function getWeatherData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données météo');
        }

        const data = await response.json();
        displayCurrentWeather(data);
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour afficher la météo actuelle
function displayCurrentWeather(data) {
    const currentTemp = Math.round(data.list[0].main.temp);
    const description = data.list[0].weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    
    document.getElementById('current-temp').textContent = currentTemp;
    document.getElementById('weather-desc').textContent = `The weather is giving: ${description}`;
    document.getElementById('weather-icon').src = icon;

    // Récupération du lever et coucher du soleil
    const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
}

// Fonction pour afficher les prévisions météo sur plusieurs jours
function displayForecast(data) {
    const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
    for (let i = 0; i < 3; i++) {
        const dayTemp = Math.round(data.list[i * 8].main.temp); // Prend une prévision toutes les 24 heures
        const dayIcon = `http://openweathermap.org/img/wn/${data.list[i * 8].weather[0].icon}@2x.png`;

        document.getElementById(`day${i+1}-temp`).textContent = `${dayTemp}°C`;
        document.getElementById(`day${i+1}-icon`).src = dayIcon;
        document.getElementById(`day${i+1}-name`).textContent = days[i];
    }
}

getWeatherData();
