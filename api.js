// Here we put all the code that handles the interaction with the API
// We will use two different API calls ["weather", "forecast"].
// This function takes the parameters city and country and tries to fetch the weather data.
const fetchWeatherReport = (reportType, city, country) => {
  // Here we set the parameters for our API request.
  const params = {
    // we are grabbing the apiKey from our weatherApp object
    APPID: weatherApp.apiKey,
    q: `${city},${country}`,
    units: weatherApp.units
  }
  // We convert our parameters into a string
  const queryString = buildQueryString(params)

  let apiCollection = ""
  switch(reportType) {
    case "current":
      apiCollection = "weather"
      break;

    case "forecast":
      apiCollection = "forecast"
      break;

    default:
      // if we dont get a correct report type we return back just false
      console.log("error")
      return false
  }

  // We put together the apiUrl, the apiCollection and the queryString to form the complete fetch url
  const url = `${weatherApp.apiUrl}${apiCollection}?${queryString}`;
  console.log(url)
  // We return the fetch call. By doing this fetchWeather will first return a promise and later the data.
  // TODO - We need to add some error handling
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
  }

  const fetchWeatherData = async (city, country) => {
    // We run both fetch calls concurrently and wait for them to both complete
    const [weatherData, forecastData] = await Promise.all([
      fetchWeatherReport("current", city, country),
      fetchWeatherReport("forecast", city, country)  // Corrected to "forecast"
    ]);

    // once completed we return an object consisting of city, country, current, forecast
    return {
      city: city,
      country: country,
      timezone: weatherData.timezone,
      current: weatherData,
      forecast: forecastData
    }
  };