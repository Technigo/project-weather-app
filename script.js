// OPEN WEATHER API ID
// const key = "c333ad1637e15b11d381a890076be47b"
const key = "e6dd4de800de3576c7c23ef944a736c4"


///// City from HTML form /////
const chooseCity = () => {
  const city = document.getElementById("city").value;
  weather(`q=${city}`)
}


///// ROUND TO SPECIFIC DECIMAL //////
const round = (number, decimal) => {
  const rounded = Math.round(number * (Math.pow(10, decimal))) / (Math.pow(10, decimal))
  return rounded
}


///// CONVERTING TO LOCAL TIME //////
const localTime = (timeSeconds, timeZone) => {

  const timeInLocal = new Date(timeSeconds * 1000) //sunrise in local time
  const localOffset = timeInLocal.getTimezoneOffset() * 60 //local offset in seconds
  const cityOffset = timeZone //city time zone offset from UTC in seconds

  seconds = timeInLocal.getSeconds()
  timeInLocal.setSeconds(seconds + cityOffset + localOffset)

  return timeInLocal.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric'
  })
}

// Filters local time closest to 12:00 in 3 hour steps for forcast
const timeFilter = (filterTime, timezone) => {
  let result = filterTime - timezone
  result = result + ((result + result % 3) % 3) // result - (result % 3) turns the result to a divider of 3 by removing the remainder
  return result
}


////// GOD OR BAD ALGO /////
const goodOrBad = (main, clouds, wind, temprature) => {
  const bad = ["Thunderstorm", "Rain", "Mist", "Snow", "Smoke", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"]

  // badWeather is true if main can be found in bad
  const badWeather = bad.includes(main)

  if (!badWeather && clouds <= 5 && wind <= 5 && temprature >= 15) {
    return "good"
  } else if (badWeather || (clouds >= 85 && wind >= 70) || temprature <= -20) {
    return "bad"
  } else {
    return "so-so"
  }
}


///// WEATHER MAIN FUNCTION /////
const weather = (location) => {


  // HTML divs
  const currentContainer = document.getElementById("current")
  const sunriseContainer = document.getElementById("sunrise")
  const forecastContainer = document.getElementById("forecast")


  ///// CURRENT WEATHER /////
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${location}&units=metric&appid=${key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {

      const cityName = json.name
      const country = getCountryName(json.sys.country)
      const temprature = json.main.temp
      const tempratureFeels = json.main.feels_like
      const wind = json.wind.speed
      const clouds = json.clouds.all
      const mainWeather = json.weather[0].main
      const descWeather = json.weather[0].description
      const warmCold = (json.main.feels_like > 0.5) ? "warm" : "cold" // degrees warm or cold

      //const conditions = ["few", "clear", "thunderstorm"]
      const pre = (descWeather.includes("few") || descWeather.includes("clear") || descWeather.includes("thunderstorm")) ? "a" : "some" // text uses "a" or "some"     

      //goodOrBad function returns "good" or "bad" or "so-so"
      const goodBad = goodOrBad(mainWeather, clouds, wind, temprature)

      // changing class on body to good or bad 
      document.body.className = goodBad

      // Adding text to HTML
      currentContainer.innerHTML = `<h1 class="side">Right now<h1><h2>I spot ${pre} <strong>${descWeather}</strong> in ${cityName}, ${country}.</h2> <h2>And it feels like it's about <strong>${round(tempratureFeels, 0)} degrees</strong> ${warmCold}<h2>`

      //currentContainer.innerHTML += `<h2>This will be a ${goodBad} day!<h2>`

      // calls function to turn sunrise UTC time into local time
      sunrise = localTime(json.sys.sunrise, json.timezone)
      sunset = localTime(json.sys.sunset, json.timezone)

      // Adding text to HTML
      sunriseContainer.innerHTML = `<h3>This morning the sun was rising at <strong>${sunrise}</strong> and it will be setting at <strong>${sunset}</strong> tonight</h3>`

    })
    .catch((err) => {
      console.log("Fetch current error: " + err);
      document.getElementById("current").innerHTML = `<h2>Not a city, try again</h2>`
      document.getElementById("forecast").innerHTML = ""
      document.getElementById("sunrise").innerHTML = ""
    })


  ///// WEATHER FORECAST /////
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${location}&units=metric&appid=${key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const filterTime = 12 // What time to forcast each day
      const timeZone = json.city.timezone / 3600 //timezone difference from UTC in hours
      const localFilterTime = timeFilter(filterTime, timeZone) // Converts to local time in 3hour steps

      //filters the list (using UTC time, closest 3 hour to 12:00 local time) 
      const filteredForecast = json.list.filter(item => item.dt_txt.includes(`${localFilterTime}:00`))

      // Resets the HTML div
      forecastContainer.innerHTML = `<h1 class="side">Prepare for</h1>`


      ///// PRINTING EACH DAY /////
      for (let index = 0; index < filteredForecast.length; index++) {
        const date = new Date(filteredForecast[index].dt * 1000)

        // Just getting weekday
        const options = {
          weekday: 'long',
        };

        // getting weekday
        const day = date.toLocaleDateString('en-GB', options)

        const temp = round(filteredForecast[index].main.temp, 1)
        const weather = filteredForecast[index].weather[0].description
        const iconType = filteredForecast[index].weather[0].icon
        const iconFile = "icons/" + iconType + ".svg"
        const pre = (weather === "clear sky" || weather === "few clouds") ? "a" : "some" // if pre and descWeather

        // Printing each day
        forecastContainer.innerHTML += `<div class="day"> <p>A <strong>${day}</strong> with ${pre} ${weather} and ${temp}&nbsp&#176;C<div><img src=${iconFile} alt="weather icon"></div></div>`
      }
    })
    .catch((err) => {
      console.log("Fetch forcast error: " + err);
    })
}


///// GET LOCATION /////
const defaultCity = "stockholm"

// Using geo-location //
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(usePosition);
    document.getElementById("current").innerHTML = `<h2>Finding your area, please wait! <h2>`
  } else {
    weather(`q=${defaultCity}`)
  }
}

const usePosition = (position) => {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const apiLocation = `lat=${latitude}&lon=${longitude}`
  weather(apiLocation)
}

getLocation()



//// BONUS! FINDING RANDOM GOOD WEATHER ////

///// Random position in array /////
const random = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

// Saves already checked cities
let checkedCityArray = []

// limit to not overrun the API
let numberToCheck = 18

// Takes a list of cities and check a random one until good weather is found
const findGoodWeather = (array) => {
  let randomCity = random(array)

  if (checkedCityArray.includes(randomCity)) {
    console.log(randomCity + " is checked");
    findGoodWeather(array) // if random city is already checked
  } else {

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${randomCity}&units=metric&appid=${key}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const temprature = json.main.temp
        const wind = json.wind.speed
        const clouds = json.clouds.all
        const mainWeather = json.weather[0].main
        const goodBad = goodOrBad(mainWeather, clouds, wind, temprature)

        if (goodBad === "good") {
          weather(`q=${randomCity}`) // redundent to check the city again 
          numberToCheck = checkedCityArray.length + 18 // resets the limit 
        } else {
          checkedCityArray.push(randomCity)
          if (checkedCityArray.length < numberToCheck) {
            findGoodWeather(array) //runs the funcion again if less than 18 cities hav been checked
          } else {
            console.log("No good weather found " + checkedCityArray.length);
            document.getElementById("current").innerHTML = `<h2>No good weather found right now, try again in a while.</h2>`
            document.getElementById("forecast").innerHTML = ""
            document.getElementById("sunrise").innerHTML = ""
            numberToCheck += 18 // add to be able to run again 
          }
        }
      })
      .catch((err) => {
        console.log("Random city name error: " + err);
        findGoodWeather(array) //runs again if random city name error
      })
  }
}

let cityList = []

// Getting a list of cities and running findGoodWeather() //
const citiesToCheck = () => {

  ///// USING JSON LIST OF CITIES TO CHECK /////
  const listOfCities = `https://raw.githubusercontent.com/mahemoff/geodata/master/cities_with_countries.txt`

  fetch(
    listOfCities)
    .then((response) => {
      return response.json()
    })
    .then((citiesJson) => {

      let cityArray = []
      citiesJson.forEach(element => {
        cityArray.push(element.city)
      })
      cityList = cityArray
    })

    .catch((error) => {
      console.log(error)
    })
}
citiesToCheck()


/// Country convertion from ISO to Name ///
const isoCountries = {
  'AF': 'Afghanistan',
  'AX': 'Aland Islands',
  'AL': 'Albania',
  'DZ': 'Algeria',
  'AS': 'American Samoa',
  'AD': 'Andorra',
  'AO': 'Angola',
  'AI': 'Anguilla',
  'AQ': 'Antarctica',
  'AG': 'Antigua And Barbuda',
  'AR': 'Argentina',
  'AM': 'Armenia',
  'AW': 'Aruba',
  'AU': 'Australia',
  'AT': 'Austria',
  'AZ': 'Azerbaijan',
  'BS': 'Bahamas',
  'BH': 'Bahrain',
  'BD': 'Bangladesh',
  'BB': 'Barbados',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BZ': 'Belize',
  'BJ': 'Benin',
  'BM': 'Bermuda',
  'BT': 'Bhutan',
  'BO': 'Bolivia',
  'BA': 'Bosnia And Herzegovina',
  'BW': 'Botswana',
  'BV': 'Bouvet Island',
  'BR': 'Brazil',
  'IO': 'British Indian Ocean Territory',
  'BN': 'Brunei Darussalam',
  'BG': 'Bulgaria',
  'BF': 'Burkina Faso',
  'BI': 'Burundi',
  'KH': 'Cambodia',
  'CM': 'Cameroon',
  'CA': 'Canada',
  'CV': 'Cape Verde',
  'KY': 'Cayman Islands',
  'CF': 'Central African Republic',
  'TD': 'Chad',
  'CL': 'Chile',
  'CN': 'China',
  'CX': 'Christmas Island',
  'CC': 'Cocos (Keeling) Islands',
  'CO': 'Colombia',
  'KM': 'Comoros',
  'CG': 'Congo',
  'CD': 'Congo, Democratic Republic',
  'CK': 'Cook Islands',
  'CR': 'Costa Rica',
  'CI': 'Cote D\'Ivoire',
  'HR': 'Croatia',
  'CU': 'Cuba',
  'CY': 'Cyprus',
  'CZ': 'Czech Republic',
  'DK': 'Denmark',
  'DJ': 'Djibouti',
  'DM': 'Dominica',
  'DO': 'Dominican Republic',
  'EC': 'Ecuador',
  'EG': 'Egypt',
  'SV': 'El Salvador',
  'GQ': 'Equatorial Guinea',
  'ER': 'Eritrea',
  'EE': 'Estonia',
  'ET': 'Ethiopia',
  'FK': 'Falkland Islands (Malvinas)',
  'FO': 'Faroe Islands',
  'FJ': 'Fiji',
  'FI': 'Finland',
  'FR': 'France',
  'GF': 'French Guiana',
  'PF': 'French Polynesia',
  'TF': 'French Southern Territories',
  'GA': 'Gabon',
  'GM': 'Gambia',
  'GE': 'Georgia',
  'DE': 'Germany',
  'GH': 'Ghana',
  'GI': 'Gibraltar',
  'GR': 'Greece',
  'GL': 'Greenland',
  'GD': 'Grenada',
  'GP': 'Guadeloupe',
  'GU': 'Guam',
  'GT': 'Guatemala',
  'GG': 'Guernsey',
  'GN': 'Guinea',
  'GW': 'Guinea-Bissau',
  'GY': 'Guyana',
  'HT': 'Haiti',
  'HM': 'Heard Island & Mcdonald Islands',
  'VA': 'Holy See (Vatican City State)',
  'HN': 'Honduras',
  'HK': 'Hong Kong',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IN': 'India',
  'ID': 'Indonesia',
  'IR': 'Iran, Islamic Republic Of',
  'IQ': 'Iraq',
  'IE': 'Ireland',
  'IM': 'Isle Of Man',
  'IL': 'Israel',
  'IT': 'Italy',
  'JM': 'Jamaica',
  'JP': 'Japan',
  'JE': 'Jersey',
  'JO': 'Jordan',
  'KZ': 'Kazakhstan',
  'KE': 'Kenya',
  'KI': 'Kiribati',
  'KR': 'Korea',
  'KW': 'Kuwait',
  'KG': 'Kyrgyzstan',
  'LA': 'Lao People\'s Democratic Republic',
  'LV': 'Latvia',
  'LB': 'Lebanon',
  'LS': 'Lesotho',
  'LR': 'Liberia',
  'LY': 'Libyan Arab Jamahiriya',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MO': 'Macao',
  'MK': 'Macedonia',
  'MG': 'Madagascar',
  'MW': 'Malawi',
  'MY': 'Malaysia',
  'MV': 'Maldives',
  'ML': 'Mali',
  'MT': 'Malta',
  'MH': 'Marshall Islands',
  'MQ': 'Martinique',
  'MR': 'Mauritania',
  'MU': 'Mauritius',
  'YT': 'Mayotte',
  'MX': 'Mexico',
  'FM': 'Micronesia, Federated States Of',
  'MD': 'Moldova',
  'MC': 'Monaco',
  'MN': 'Mongolia',
  'ME': 'Montenegro',
  'MS': 'Montserrat',
  'MA': 'Morocco',
  'MZ': 'Mozambique',
  'MM': 'Myanmar',
  'NA': 'Namibia',
  'NR': 'Nauru',
  'NP': 'Nepal',
  'NL': 'Netherlands',
  'AN': 'Netherlands Antilles',
  'NC': 'New Caledonia',
  'NZ': 'New Zealand',
  'NI': 'Nicaragua',
  'NE': 'Niger',
  'NG': 'Nigeria',
  'NU': 'Niue',
  'NF': 'Norfolk Island',
  'MP': 'Northern Mariana Islands',
  'NO': 'Norway',
  'OM': 'Oman',
  'PK': 'Pakistan',
  'PW': 'Palau',
  'PS': 'Palestinian Territory, Occupied',
  'PA': 'Panama',
  'PG': 'Papua New Guinea',
  'PY': 'Paraguay',
  'PE': 'Peru',
  'PH': 'Philippines',
  'PN': 'Pitcairn',
  'PL': 'Poland',
  'PT': 'Portugal',
  'PR': 'Puerto Rico',
  'QA': 'Qatar',
  'RE': 'Reunion',
  'RO': 'Romania',
  'RU': 'Russian Federation',
  'RW': 'Rwanda',
  'BL': 'Saint Barthelemy',
  'SH': 'Saint Helena',
  'KN': 'Saint Kitts And Nevis',
  'LC': 'Saint Lucia',
  'MF': 'Saint Martin',
  'PM': 'Saint Pierre And Miquelon',
  'VC': 'Saint Vincent And Grenadines',
  'WS': 'Samoa',
  'SM': 'San Marino',
  'ST': 'Sao Tome And Principe',
  'SA': 'Saudi Arabia',
  'SN': 'Senegal',
  'RS': 'Serbia',
  'SC': 'Seychelles',
  'SL': 'Sierra Leone',
  'SG': 'Singapore',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'SB': 'Solomon Islands',
  'SO': 'Somalia',
  'ZA': 'South Africa',
  'GS': 'South Georgia And Sandwich Isl.',
  'ES': 'Spain',
  'LK': 'Sri Lanka',
  'SD': 'Sudan',
  'SR': 'Suriname',
  'SJ': 'Svalbard And Jan Mayen',
  'SZ': 'Swaziland',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'SY': 'Syrian Arab Republic',
  'TW': 'Taiwan',
  'TJ': 'Tajikistan',
  'TZ': 'Tanzania',
  'TH': 'Thailand',
  'TL': 'Timor-Leste',
  'TG': 'Togo',
  'TK': 'Tokelau',
  'TO': 'Tonga',
  'TT': 'Trinidad And Tobago',
  'TN': 'Tunisia',
  'TR': 'Turkey',
  'TM': 'Turkmenistan',
  'TC': 'Turks And Caicos Islands',
  'TV': 'Tuvalu',
  'UG': 'Uganda',
  'UA': 'Ukraine',
  'AE': 'United Arab Emirates',
  'GB': 'United Kingdom',
  'US': 'United States',
  'UM': 'United States Outlying Islands',
  'UY': 'Uruguay',
  'UZ': 'Uzbekistan',
  'VU': 'Vanuatu',
  'VE': 'Venezuela',
  'VN': 'Viet Nam',
  'VG': 'Virgin Islands, British',
  'VI': 'Virgin Islands, U.S.',
  'WF': 'Wallis And Futuna',
  'EH': 'Western Sahara',
  'YE': 'Yemen',
  'ZM': 'Zambia',
  'ZW': 'Zimbabwe'
};

function getCountryName(countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}