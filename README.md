Project:  WeatherTheWeatherApp

This project is a weahterApp that fetches data from an API and displays the current location, temp, weather condition, sunrise and sunset time. It also shows a forecast of today and the following 4 days. The app changes images and background depending on if the condition is clear, cloudy, rainy and if it is night or day. 

## The problem

The first challange was to fetch the data from the url. I used the console.log to solve this as it helped me se where the specific data was in the api.
The second challange was to convert the sunset and sunriseTime into "real numbers", i used convertUnixToTime, unixTimestamp, 

changing background and images to adapt to the weathercondition and daytime/nighttime. 
This was very challenging, i used a "fetch"-condition to first initialise the different weatherconditions and hid or add the elements from html. To see if it worked i changed the weatherCondition = to "rain" "cloud" or "broken".
I then tried to get the current hour from the ipa, i was not successful unfortionatly but the time i got was pretty close to the current time so i used that. I then added if & else if statements to the "fetch" to make it check if it is daytime or nighttime. To see if i was successful i changed the "currentHour" to "14" and. 


If i had more time i would: 
- Create a helper-function that would include all the images and cards to make the fetch-function be shorter, as it is now a lot of redundant and repetetive code which makes it hard to follow and read. I believe this would fix that problem. 
- Fetch and add symbols for each day of the forecast, depending on if the weather condition is cloudy, rainy or clear.
- I would adjust the styling so that it matches the figma-layout better. 
- Make the app more responsive to both smaller and wider screens. 

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
