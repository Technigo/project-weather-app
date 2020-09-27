## WEATHER APP DESCRIPTION:

This week's project is to build a simple weather web app with mobile first approach, also responsive for tablet & desktop, that shows today's weather and temperature, and a 5-day forecast using a weather API.


## TECH & TOOLS:
- JS
- HTML5
- CSS
- Visual Studio
- SVG icons/pictures
- Google searching for information, free icons, etc
- Teammates helping eachother <3

## PLAN:
1. Read through every week material from Technigo & see the movies
2. Fork the project in GitHub
3. Team Lab Session that was meaningful/learnfull for this individual project
4. Concentrating step by step on blue level, then adding more if time. When step 5 (style the weather app) I did a sketch on how I would like it to look, painted also the element/boxes so that I could easily think on how to style and do the html and css.


## PROMBLEMS:
1. Getting weather description from the API:
Found out the weather description in the API was in an array (the city name and temp was in an object), so googled it, looked at a lecture video from this week material and found out I needed to do a forEach... and it worked out :)

2. Getting the temperature to 1 decimal:
Googled "json to 1 decimal", found .toFixed(2) on stack overflow, 
person that wonder how to round to two decimals, so took that,
wasn't really sure were to put it, but tried in the ${json.main.temp}, .toFixed(1) and it worked out :)

3. Show different weather icons depending on weather conditions:
I had some struggle with getting this to work. First I thought I should copy the code of the icons/SVG and have in HTML. Later I googled it and found out how to get the SVG with the img tag. Then I made a function, with conditional statements, (ES6 JS) for changing the icons depending on weather main data from the API. I tried out different way, first thought it would be easy, but as new at this, I don't have the full understanding of JS, and also there are several ways to do this. I asked for help among my teammates and googled and tried different ways. And finally I got it to work! What I thought was a bit strange was that VS suggest convert the ES6 function to a named function (old way as I understand it), and if I did so it worked, else it did not work. Don't understand really... and I would like to understand it.

4. Showing a icon when nighttime:
Struggled with this for hours. Got help from a teammate and I needed to change the operator or to && and it worked! :D Then I googled to get some solution for removing the weatherIcon to show also when the nightIcon show. So in a couple of minutes (not hours(!)) I found a solution that worked.
So I needed to create a parent for the weatherIcon img in HTML and then write like this in the if statement, in the JS-function for night:
if (currentTime >= 22 && currentTime <= 04){
        document.getElementById('nightIcon').src = './icons/iconfinder_03_moon_sleepy_night_emoticon_weather_smiley_3375686.svg';
        var element = document.getElementById("weatherIconParent");
        element.parentNode.removeChild(element);

## IF I HAD MORE TIME:
I would had like to:
- make all capitals to upperCase (tried a lot, I guess it is easy, but I have'nt figured it out, could use a font from google fonts that is only in uppercase letters, but I did'nt.
- more weather info and for more cities, also for where the user is
- icons for the weather forecast
- understand more and maybe not have so much info in the first function for current weather/fetch api... Maybe I could have some of the info outside, like I have with the nightIcon function.


## View it live
- Netlify: 
- GitHub: https://github.com/bloeli/project-weather-app
