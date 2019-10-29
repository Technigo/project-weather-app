window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let theSunset = document.querySelector(".sunset-time");
    let theSunrise = document.querySelector(".sunrise-time");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8cbd9193bf1986e2387d169ac2d73a9e`;
            //const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8cbd9193bf1986e2387d169ac2d73a9e`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    const name = json.name;
                    const temp = json.main.temp;
                    const description = json.weather[0].description;
                    //const { icon } = json.weather[0];
                    const sunrise = new Date(json.sys.sunrise * 1000).toLocaleTimeString(
                        [], { hour: "2-digit", minute: "2-digit" }
                    );
                    const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString(
                        [], {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );

                    //Set DOM Elemens from the API
                    temperatureDegree.innerHTML = temp.toFixed(1);
                    temperatureDescription.innerHTML = description;
                    locationTimezone.innerHTML = `${name}`;
                    theSunrise.innerHTML = `Sunrise: ${sunrise}`;
                    theSunset.innerHTML = `Sunset: ${sunset}`;

                    //Set icon
                    //setIcons(icon, document.querySelector(".icon"));
                });
        });
    } else {
        //does not work?..
        locationTimezone.innerHTML =
            "Geolocation is not supported by this browser.";
    }

    // function setIcons(icon, iconID) {
    //     const skycons = new Skycons({ color: "white" });
    //     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    //     skycons.play();
    //     return skycons.set(iconID, Skycons[currentIcon]);
    // }
});