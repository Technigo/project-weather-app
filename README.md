# Weather App

This week's project is to build a simple weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

Getting weather description from the API:
Found out the weather description in the API was in an array (the city name and temp was in object), so googled it, looked at a lecture video from this week material from Technigo and found out I needed to do a forEach... and it worked out :)

Getting the temperature to 1 decimal:
Googled "json to 1 decimal", found .toFixed(2) on stack overflow, 
person that wonder how to round to two decimals, so took that,
wasn't really sure were to put it, but tried in the ${json.main.temp}, .toFixed(1) and it worked out :)

SHOW DIFFERENT WEATHER ICONS DEPENDING ON WEATHER
I had some struggle with getting this to work. First I thought I should copy the code of the icons/SVG and have in HTML. Later I googled it and found out how to get the SVG with the img tag. Then I made a function (ES6 JS) for changing the icons depending on weather main data from the API. I tried out different way, first thought it would be easy, but as new at this, I don't have the full understanding of JS, and also there are several ways to do this. I asked for help among my teammates and googled and tried different ways. And finally I got it to work! What I thought was a bit strange was that VS suggest convert the ES6 function to a named function (old way as I understand it), and if I did so it worked, else it did not work. Don't understand really... and I like to understand it. Then I would like to have a night icon when night, and I tried to do a function for this with get hours, new Date, etc, but I have not got it to work. Have spend hours on it, and time is running out.

NIGHT ICON:
Got help from a teammate and I needed to change the operator or to && and it worked! :D Then I googled to get som solution for removing the weatherIcon to show also when the nightIcon show. So in a couple of minutes (not hours(!)) I found a solution that worked.
So I needed to create a parent just for the weatherIcon img in HTML and then write like this in the if statement, in the JS-function for night:
if (currentTime >= 22 && currentTime <= 04){
        document.getElementById('nightIcon').src = './icons/iconfinder_03_moon_sleepy_night_emoticon_weather_smiley_3375686.svg';
        var element = document.getElementById("weatherIconParent");
        element.parentNode.removeChild(element);

IF MORE TIME:
I would like to:
- make all capitals to upperCase (tried a lot, I guess it is kind of ease, but I have'nt figured it out)
- more weather info and for more cities, also for where the user is
- icons for the weather forecast


## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
