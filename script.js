//container


//fetch
/* 
========================================== 
const container = document.getElementById('astros')
fetch('http://api.open-notify.org/astros.json').then((response)=>{
    return response.json()
}).then((json) =>{
    console.log(json)
    container.innerHTML =`<h1> There are ${json.number} people in space</h1>`
json.people.forEach(element => {
    container.innerHTML += `<p>${element.name} is on craft ${element.craft}</p> `
});

})
document.getElementById('killerImage').src = mystery.killer.image
   var date = new Date(1546108200 * 1000);
    console.log(date.toUTCString())
    var fixed = rounded.toFixed(1);

    // Here a date has been assigned 
// while creating Date object 
var dateobj = new Date('October 15, 1996 05:35:32'); 
  
// Contents of above date object is converted 
// into a string using toString() function. 
var B = dateobj.toString(); 
  
// Printing the converted string. 
document.write(B); 
a.replaceAt(4,'');
========================================== 
*/

const today = document.getElementById('currentWeather')



//fetch
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=2b9468766d0e54560c7e599762d2e80b').then((response) => {
    return response.json()
}).then((json) => {
    console.log(json)
    const times = (new Date(json.dt * 1000)).toUTCString().split(' ')
    const suny = [json.sys.sunrise, json.sys.sunset]
    console.log("sun", suny)
    const sunyNew = suny.map((item) => {
        return (new Date(item * 1000)).toUTCString().split(' ')
    })
    console.log(sunyNew)
    const sunyList = sunyNew.map((item) => {
        const clock = item[4].split(':')
        return `${clock[0]}:${clock[1]}`
    })
    console.log(sunyList)
    const noSecond = times[4].split(':')
    console.log(times)
    let weatherObject = {
        city: json.name,
        name: json.weather[0].main,
        description: json.weather[0].description,
        temp: `${(json.main.temp - 273.15).toFixed(1)} C`,
        weekDay: times[0].replace(',', ''),
        date: `${times[1]} ${times[2]} ${times[3]}`,
        time: `${noSecond[0]}:${noSecond[1]}`,
        rise: sunyList[0],
        set: sunyList[1]
    }
  
   
    console.log("my object", weatherObject)
    const icons = {
        clouds: {image: "media/clouds.svg", bgColor: '#F4F7F8', fontColor: '#F47775', head: `Light a fire and get cozy. ${weatherObject.city} is looking gray today`},
        rain: {image: "media/rain.svg", bgColor: '#A3DEF7', fontColor: '#164A68', head: `Don't forget your umbrella Its wet in ${weatherObject.city} today`,},
        clear: {image:  "media/clear.svg", bgColor: '#F7E9B9', fontColor: '#2A5510', head: `Get your sunnies on. ${weatherObject.city} is looking rather great today`}
    }

    const pictures = () => {
        console.log("inside function", weatherObject.name)
        let choice = "blank"
        if (weatherObject.name === "Clouds") {
            choice = icons.clouds
        }
        else if (weatherObject.name === "Rain") {
            choice = icons.rain
        }
        else if (weatherObject.name === "Clear") {
            choice = icons.clear
        }
        else if (weatherObject.name === "Snow") {
            choice = icons.rain
        }
        console.log("image", choice)
        return choice
    }
    
    const myChoice = pictures()
    console.log(myChoice)
    const todayWeather = [json.main.temp, json.main.feels_like, json.main.temp_min, json.main.temp_max]
    document.getElementById('todayIcon').src = myChoice.image
    const myToday = document.getElementById('weatherToday')
    myToday.innerHTML += `<p>${weatherObject.name} | ${weatherObject.temp}</p>`
    const myTotal = document.getElementById('container')
    myTotal.style.backgroundColor = myChoice.bgColor
    myTotal.style.color = myChoice.fontColor
    myToday.innerHTML += `<p>sunrise ${weatherObject.rise}</p>`
    myToday.innerHTML += `<p>sunset ${weatherObject.set}</p>`
    document.getElementById('headline').innerHTML = myChoice.head
    
})
// fetch 5 -days
// api.openweathermap.org/data/2.5/forecast?q=London&appid=2b9468766d0e54560c7e599762d2e80b
fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=2b9468766d0e54560c7e599762d2e80b').then((response) => {
    return response.json()
}).then((jsonweek) => {
    console.log('week', jsonweek)
    console.log("day1", jsonweek.list[0])
    const weekTimes = (new Date(jsonweek.dt * 1000)).toUTCString().split(' ')

    const myFunc = () => {
        let dayListWeather = []
        jsonweek.list.forEach((item) => {
            const weekTime = (new Date(item.dt * 1000)).toUTCString().split(' ')
            const y = item.dt_txt.split(' ')
            dayListWeather.push({ name: item.weather[0].main, description: item.weather[0].description, temp: ((item.main.temp - 273.15).toFixed(1) + 'C'), weekDay: weekTime[0], date: y[0], time: y[1], wind: item.wind.speed })

        })
        return dayListWeather

    }
    const newArr = myFunc()
    console.log(newArr)
    const weatherShow = newArr.filter((item) => {
        return (item.time === "12:00:00")
    })
    console.log(weatherShow)

//const myTry = pictures()



    const weekText = document.getElementById('forecast')
    const fontCol = document.getElementById('headline').style.color
    weatherShow.forEach((day, index, arr) => {
        const myIndex = index.toString()
        const myString = document.getElementById(myIndex)
        myString.innerHTML += `<p>${day.weekDay} ${day.date}   ${day.temp} ${day.name} ${day.wind}</p>`
        
        myString.style.borderTopColor = fontCol
        myString.style.borderTopStyle = 'dotted'
        myString.style.borderWidth = 'thin'
        
    })
    
})



// console.log(moreAboutPokemons);
// const newArray = moreAboutPokemons.map(val => {
//   return val.name;
// });
// console.log(newArray);