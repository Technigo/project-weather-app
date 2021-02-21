# Weather App

We were tasked with making a weather app using the openweather API

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

To get the data from the openweather endpoints we used the fetch() function in conjunction with .then() method calls to allow for asynchronous js code. The rotating sun icon was animated by repurposing code found in a css tutorial for cards that flipped on hover. We also made the background gradient change depending on fetched temperature via an if/else-if structure.

We made sure to get the basics of the API fetching and html done on day one, so we had time to focus on polishing the app by the end of the week. 

We used the first suggested website design as an initial benchmark which we later itterated upon and personalized.

Thanks to advice from Maks we managed to turn the code responsible for adding a '0' before single digits on the clock into a ternary operation instead of a full if-statement. We ran into problems with the forecast list spilling out of the page html and body, causing a repeat of our gradient background. To avoid this, we ended up simply extending the height of the html via a querySelector whenever the forecast list was drawn.

If we had more time, we'd have done more css styling, adding more icons and animations, especially upon user interaction. We'd also have liked to make the app work on phones, as it currently has trouble reading the days, and thus the length of the text "Undefined" made the weather icons get squished. 

## View it live

https://weatheroracle.netlify.app/
