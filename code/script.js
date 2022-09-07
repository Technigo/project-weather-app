const summary = document.getElementById("summary");
const mainSection = document.getElementById("mainSection");
const forecast = document.getElementById("forecast");
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Global variables
let weather;


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })

    .then((json) => {
    weather = json.weather[0].main
    summary.innerHTML = `<h1>${json.name}</h1>
    ${json.weather[0].main}
    ${Math.round(json.main.temp)}°C
    ` 
    })
 
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=a8803210b888f640e92f889b4be6e93f')
    .then((response) => {
    return response.json()
    })
    
    .then((json) => {
    console.log(json)
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('15:00'))
    console.log(filteredForecast)

    filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
      
        // Make a Date object for right now
        const now = new Date();
      
        // Compare the forecast's day with the day right now
        const isTodaysForecast = date.getDay() === now.getDay();
      
        let dayName = week[date.getDay()]
      
        // We don't want to include this forecast if it is for today
        if(!isTodaysForecast){
          forecast.innerHTML += `<p>${dayName}: ${Math.round(day.main.temp)} °C</p>`
        }
      })

    if (weather === 'Clear') {    // || 
        document.body.style.backgroundColor = '#F7E9B9';
        document.body.style.color = '#2A5510';
        mainSection.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="73.05" height="51.716" viewBox="0 0 73.05 51.716">
            <g id="noun_Sunglasses_2055147" transform="translate(0 -2.998)">
            <g id="Group_7" data-name="Group 7" transform="translate(0 2.998)">
            <g id="Group_6" data-name="Group 6">
            <g id="Group_1" data-name="Group 1" transform="translate(0 24.387)">
            <path id="Path_1" data-name="Path 1" d="M17.492,38.339c-3.153,0-5.975-.527-7.725-1.781A15.769,15.769,0,0,1,3.2,25.632c-.04-.24-.064-.426-.1-.551-.28-1-1.72-1.848-2.2-2.067A1.541,1.541,0,0,1,0,21.623V15.536a1.523,1.523,0,0,1,1.059-1.449c19.638-6.291,32.026-1.163,34.3-.073h2.328c2.274-1.087,14.656-6.218,34.3.073a1.524,1.524,0,0,1,1.056,1.449v6.088a1.523,1.523,0,0,1-.9,1.391c-.475.216-1.915,1.065-2.195,2.064-.033.125-.061.31-.1.551a15.768,15.768,0,0,1-6.565,10.927c-3.619,2.6-11.825,2.076-18.062.222-7.034-2.094-8.6-9.944-8.672-10.306h0a.938.938,0,0,0-.03-.125c0,.024-.009.052-.015.079-.07.377-1.631,8.252-8.678,10.349A37.629,37.629,0,0,1,17.492,38.339ZM39.541,25.906c.027.134,1.33,6.4,6.547,7.956,6.864,2.042,13.35,1.7,15.42.222a12.578,12.578,0,0,0,5.336-8.943c.064-.387.119-.688.173-.886a6.562,6.562,0,0,1,2.989-3.54v-4.06c-19.5-5.9-31.119.155-31.238.219a1.529,1.529,0,0,1-.721.183H35a1.551,1.551,0,0,1-.718-.18c-.116-.064-11.837-6.094-31.241-.222v4.06a6.534,6.534,0,0,1,2.986,3.54,7.745,7.745,0,0,1,.173.883,12.572,12.572,0,0,0,5.336,8.943c2.067,1.479,8.553,1.82,15.42-.222,5.25-1.561,6.535-7.9,6.547-7.956a3.086,3.086,0,0,1,2.949-2.773A3.261,3.261,0,0,1,39.541,25.906Z" transform="translate(0 -11.01)" fill="#2a5510"/>
            </g>
            <g id="Group_2" data-name="Group 2" transform="translate(48.699)">
            <path id="Path_2" data-name="Path 2" d="M38.829,33.433a1.52,1.52,0,0,1-1.333-.785L23.233,6.8a1.521,1.521,0,0,0-2.773.356l-1.516,3.978a1.522,1.522,0,0,1-2.843-1.09l1.473-3.853a4.445,4.445,0,0,1,3.8-3.153A4.492,4.492,0,0,1,25.887,5.3L40.159,31.171a1.527,1.527,0,0,1-.6,2.07A1.484,1.484,0,0,1,38.829,33.433Z" transform="translate(-16 -2.998)" fill="#2a5510"/>
            </g>
            <g id="Group_3" data-name="Group 3" transform="translate(0.001 0.002)">
            <path id="Path_3" data-name="Path 3" d="M1.521,33.431a1.521,1.521,0,0,1-1.33-2.258L14.454,5.322a4.568,4.568,0,0,1,8.367.992l1.431,3.726a1.524,1.524,0,0,1-2.846,1.09L19.933,7.276a1.571,1.571,0,0,0-1.324-1.218,1.49,1.49,0,0,0-1.507.758L2.851,32.646A1.512,1.512,0,0,1,1.521,33.431Z" transform="translate(0 -2.999)" fill="#2a5510"/>
            </g>
            <g id="Group_4" data-name="Group 4" transform="translate(9.162 30.952)">
            <path id="Path_4" data-name="Path 4" d="M4.727,21.519a1.522,1.522,0,0,1-1.491-1.227,14.017,14.017,0,0,1-.225-2.615,4.519,4.519,0,0,1,3.869-4.493A1.521,1.521,0,1,1,7.3,16.2a1.487,1.487,0,0,0-1.245,1.467,10.983,10.983,0,0,0,.17,2.039,1.521,1.521,0,0,1-1.2,1.787A1.673,1.673,0,0,1,4.727,21.519Z" transform="translate(-3.01 -13.167)" fill="#2a5510"/>
            </g>
            <g id="Group_5" data-name="Group 5" transform="translate(42.635 31.171)">
            <path id="Path_5" data-name="Path 5" d="M15.744,21.615a1.522,1.522,0,0,1-1.491-1.227,11.957,11.957,0,0,1-.228-2.952,4.523,4.523,0,0,1,3.631-4.167,1.523,1.523,0,1,1,.59,2.989,1.47,1.47,0,0,0-1.184,1.358,8.85,8.85,0,0,0,.177,2.182,1.526,1.526,0,0,1-1.2,1.79A1.616,1.616,0,0,1,15.744,21.615Z" transform="translate(-14.008 -13.239)" fill="#2a5510"/>
            </g>
            </g>
            </g>
            </g>
        </svg>

        <p>Get your sunnies on. ${json.city.name} is looking rather great today.</p>`  
    }
    else if (weather === 'Rain') {
        document.body.style.backgroundColor = '#A3DEF7';
        document.body.style.color = '#164A68'; 
        mainSection.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="73.451" height="73" viewBox="0 0 73.451 73">
            <g id="noun_Umbrella_2030530" transform="translate(0 -0.435)">
            <g id="Layer_2" data-name="Layer 2" transform="translate(0 0.435)">
            <g id="Layer_1" data-name="Layer 1">
            <path id="Path_6" data-name="Path 6" d="M54.553,83.166a6.28,6.28,0,0,1-6.273-6.273V48.549a1.249,1.249,0,1,1,2.5,0V76.893a3.775,3.775,0,1,0,7.543,0,1.249,1.249,0,0,1,2.5,0,6.28,6.28,0,0,1-6.265,6.273Z" transform="translate(-12.818 -12.955)" fill="#164a68"/>
            <path id="Path_7" data-name="Path 7" d="M73.451,43.087h-2.2l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H57.093l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H42.939l-.323-.735a6.3,6.3,0,0,0-11.532,0l-.323.735H28.793l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H14.646l-.331-.735a6.3,6.3,0,0,0-11.524,0l-.331.735H0V41.838A34.265,34.265,0,0,1,34.228,7.61h4.995A34.265,34.265,0,0,1,73.451,41.838ZM22.7,36.094a8.814,8.814,0,0,1,7.073,3.57,8.814,8.814,0,0,1,14.147,0,8.814,8.814,0,0,1,14.147,0A8.814,8.814,0,0,1,70.733,38.1a31.775,31.775,0,0,0-31.51-28H34.228A31.782,31.782,0,0,0,2.688,38.335,8.814,8.814,0,0,1,15.63,39.664a8.814,8.814,0,0,1,7.073-3.57Z" transform="translate(0 -2.418)" fill="#164a68"/>
            <path id="Path_8" data-name="Path 8" d="M49.578,3.87h0a2.248,2.248,0,0,1,2.248,2.248V7.241h-4.5V6.118A2.248,2.248,0,0,1,49.578,3.87Z" transform="translate(-12.566 -1.425)" fill="#164a68"/>
            <path id="Path_9" data-name="Path 9" d="M20.8,42.047A1.249,1.249,0,0,1,19.549,40.8,36.351,36.351,0,0,1,30.838,13.923,38.283,38.283,0,0,1,42.157,6.3a1.25,1.25,0,0,1,.911,2.328h0A36.373,36.373,0,0,0,32.5,15.8a33.458,33.458,0,0,0-10.415,25A1.249,1.249,0,0,1,20.8,42.047Z" transform="translate(-5.189 -2.047)" fill="#164a68"/>
            <path id="Path_10" data-name="Path 10" d="M70.476,42.037a1.249,1.249,0,0,1-1.249-1.249c0-23.13-20.838-32.1-21.051-32.186a1.249,1.249,0,1,1,.962-2.3,39.855,39.855,0,0,1,11.3,7.823A36.468,36.468,0,0,1,71.732,40.788,1.256,1.256,0,0,1,70.476,42.037Z" transform="translate(-12.567 -2.036)" fill="#164a68"/>
            <path id="Path_11" data-name="Path 11" d="M39.875,42.008a1.249,1.249,0,0,1-1.249-1.183c-.044-.948-1.131-23.365,7.7-33.134a1.249,1.249,0,0,1,1.851,1.675c-8.138,9.005-7.088,31.106-7.051,31.327a1.249,1.249,0,0,1-1.183,1.315Z" transform="translate(-10.238 -2.338)" fill="#164a68"/>
            <path id="Path_12" data-name="Path 12" d="M56.484,41.987H56.41a1.249,1.249,0,0,1-1.175-1.315c0-.22,1.072-22.329-7.051-31.327a1.249,1.249,0,1,1,1.851-1.675c8.814,9.769,7.742,32.186,7.69,33.134a1.249,1.249,0,0,1-1.241,1.183Z" transform="translate(-12.7 -2.317)" fill="#164a68"/>
            <rect id="Rectangle_4" data-name="Rectangle 4" width="73" height="73" fill="none"/>
            </g>
            </g>
            </g>
        </svg>  
        
    <p>Don't forget your umbrella. It's wet in ${json.city.name} today.</p>` 
    }
    else if (weather === 'Snow') {
        document.body.style.backgroundColor = '#A3DEF7';
        document.body.style.color = '#164A68'; 
    }
    else {
        document.body.style.backgroundColor = '#F4F7F8';
        document.body.style.color = '#F47775';
        
        mainSection.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="77.194" height="53.261" viewBox="0 0 77.194 53.261">
            <g id="noun_Cloud_1188486" transform="translate(-5.8 -20.6)">
            <g id="Group_8" data-name="Group 8" transform="translate(6.8 21.6)">
            <path id="Path_13" data-name="Path 13" d="M39.262,72.861a14.468,14.468,0,0,1-12.793-7.746,13.6,13.6,0,1,1-6.527-25.761,18.322,18.322,0,0,1-.174-2.176A15.541,15.541,0,0,1,50.4,33.436a13.065,13.065,0,0,1,6.092-1.392,13.5,13.5,0,0,1,13.49,12.1,12.248,12.248,0,0,1,12.01,11.923A11.931,11.931,0,0,1,64.153,66.42,9.2,9.2,0,0,1,50.228,67.9,14.45,14.45,0,0,1,39.262,72.861ZM26.73,64.071H26.9q.131,0,.261.261A13.378,13.378,0,0,0,39.349,71.99a13.234,13.234,0,0,0,10.618-5.135.452.452,0,0,1,.348-.174c.174,0,.261,0,.348.174A8.351,8.351,0,0,0,63.8,65.55a.538.538,0,0,1,.609-.174,10.569,10.569,0,0,0,5.831,1.654A11.068,11.068,0,0,0,81.3,55.977,11.393,11.393,0,0,0,70.071,44.924h-.435a.411.411,0,0,1-.435-.435,12.726,12.726,0,0,0-18.8-10.1.388.388,0,0,1-.435,0c-.087-.087-.261-.174-.261-.348A14.682,14.682,0,0,0,20.638,37a11.815,11.815,0,0,0,.261,2.524.523.523,0,0,1-.087.348.452.452,0,0,1-.348.174,12.706,12.706,0,1,0-.087,25.413,13.669,13.669,0,0,0,6.092-1.48A.32.32,0,0,0,26.73,64.071Z" transform="translate(-6.8 -21.6)" fill="#f47775" stroke="#f47775" stroke-width="2"/>
            </g>
            </g>
        </svg>

        <p>Light a fire and get cosy. ${json.city.name} is looking grey today.</p>`
    }
})
