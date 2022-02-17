# Weather App
 It's a group project developed by 5 student, practising branch, merge pull, push.

- **STEP 1 - Get started with the weather API**
    
    [Sign up for a free Open Weather Map account](https://home.openweathermap.org/users/sign_up). Once signed in, go to "My API keys". 
    You find that in the menu if you click     your username. Copy the API Key. You can use the API Key in the APPID parameter when making calls to the openweathermap API.
    
    For example, to get the current weather in Stockholm, you can use the URL below. Remember to replace `YOUR_API_KEY` with the API key you copied from your dashboard.

    
- **STEP 2 - Present some data on your web app**
    
    Your task is to present some data on your web app. Start with
    
    - the city name
    - the temperature (rounded to 1 decimal place)
    - and what type of weather it is (the "description" in the JSON)

**STEP 3 - Features**

Now it's time to split up and start working in GitHub branches. Decide beforehand when you should have the [feature freeze](https://en.wikipedia.org/wiki/Freeze_(software_engineering)) so that you make time for merging.

- **Feature: Sunrise and sunset** 🌅
    
    Show the time for sunrise and sunset in a readable time format (Example: 13:00 or 1 PM). You will have to **format the date from milliseconds to a readable format**. [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) is a useful resource for how to do this.
    
- **Feature: Weather forecast** 📅
    
    Show a forecast for the next 5 days. You can choose how to display the forecast - perhaps you want to show the min and max temperature for each day, or perhaps you want to show the temperature from the middle of the day, or the humidity, what it feels like and so on.
    
    
- **Feature: Style it 🎨**
    
    Style it to look like one of the provided designs.
    

**STEP 4 - Want more features?**

- **Feature: Styling warm/cold** 🌞❄️
    
    Change the colours of the page based on the weather. If the weather is warm – use warm colours. If the weather is colder, use cold colours. If you really want to push your CSS muscles you can even make a [background gradient](https://www.w3schools.com/css/css3_gradients.asp).
    
    Another alternative is to include visual indicators for the type of weather, cloudy/sunny/rainy/etc.
    
- **Feature: More cities** 🏙️
    
    Give the user the option to choose between a couple of your favourite cities.
    

**STEP 5 - Even more?!**

- **Feature: Use your location** 🗺️
    
    Use the [Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp) that is built into your browser to fetch the city that you are located in at the moment and show the weather for your location.
    
- **Feature: Add more data 💽**
    
    Explore the API and use another endpoint of the Weather API to include supplementary information.
    
- **Feature: CSS Animations**
    
    Add some CSS animations to your app, e.g. pulsating sun/raindrops.
    
    
## Requirements 🧪

Your project should fulfil the **🔵  Blue Level** and all of the **General Requirements.** Use the **🔴  Red Level** and **⚫  Black Level** to push your knowledge to the next level!

**General Requirements**

- Contribute by helping others with this project on Stack Overflow.
- Demo your solution for the rest of the team.
- Code follows Technigo’s code guidelines.
- Publish your site on Netlify.

**🔵  Blue Level (Minimum Requirements)**

- You should fetch data from the API using `fetch()` in JavaScript
- All data in the sketch above should be present and fetched from the API
- The presentation of the data should be in the specified format.
- The page should work on mobile (mobile first!), tablet and desktop (Be responsive)
- Step 1 & 2 should be done together and step 3 should be done in branches

🔴 ⚫  **Intermediary and advanced Goals**

Stretch your muscles by trying out the different features suggested in steps 4 & 5 💪

Pick the ones you fancy or come up with other ideas and features!

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
