const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`
const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`

const cityName = "Visby";

const currentWeather = `${currentWeather_URL}${cityName}&appid=${API_KEY}`
const fiveDayWeather = `${fiveDayWeather_URL}${cityName}&appid=${API_KEY}`



/* const cityName = "Visby"

const fetchCurrentWeather = () => {
    fetch('currentWeather')
    .then(response => response.json())
    .then(data => {
       console.log(data) 
    })
    .catch(error => {
        console.error('Error', error)
    });

    fetchCurrentWeather() 

};



const currentWeather_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const fiveDayWeather_URL = `https://api.openweathermap.org/data/2.5/forecast?q=`;
const API_KEY = `5261612a788e0fbd6e1f5336fd150afe`;

*/


//-----------------------------------
//Function that fetches the currentweather

const fetchCurrentWeather = () => {
  fetch(currentWeather) // Use the variable currentWeather here
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      //console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

// Call the fetchCurrentWeather function to initiate the fetch request
fetchCurrentWeather();



// ------------
//Function that fetches the 5 day weather

const fetchFiveDayWeather = () => {
    fetch(fiveDayWeather) // Use the variable currentWeather here
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  // Call the function to initiate the fetch request
  fetchFiveDayWeather();