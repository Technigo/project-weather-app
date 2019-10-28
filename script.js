window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?q=Malm%C3%B6&units=metric&APPID=61e9d8d2cf2e655be274549ecb10f14e`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { name } = data;
                    const { temp } = data.main;
                    const { description } = data.weather[0];
                    const { icon } = data.weather[0];
                    //Set DOM Elemens from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = name;
                    //Set icon
                    setIcons(icon, document.querySelector(".icon"));
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});