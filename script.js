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
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8cbd9193bf1986e2387d169ac2d73a9e`;

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
                    temperatureDegree.textContent = temp.toFixed(1);
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = name;
                    //Set icon
                    setIcons(icon, document.querySelector(".icon"));
                });
        });
    } else {
        locationTimezone.textContent =
            "Geolocation is not supported by this browser.";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});