//iterate over the item "list"
//going to group them by day
//iterat over each day
//calculate values

//ul in HTML "forecast"

const handle5DayForecast = json => {
  const forecastDiv = document.getElementById("forcast")
  const dates = {}

  json.list.forEach(weather => {
    const date = weather.dt_txt.split(" ")[0]
    if (dates[date]) {
      dates[date].push(weather)
    } else {
      dates[date] = [weather]
    }
  })

  //object.entries is pure js code

  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return
    }

    const date = item[0]
    const weatherValues = item[1]

    const temps = weatherValues.map(value => {
      return value.main.temp
    })
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    forecastDiv.innerHTML += `<li>${date} - min: ${minTemp.toFixed(
      1
    )}, max: ${maxTemp}`
  })
}
//toFixed avrundar så man får en decimal
fetch

  .then(response => {
    return response.json()
  })

  .then(handle5DayForecast)
//.catch((err) => console.log(err.message)) - use this to find errors

// random selection from description (main)
