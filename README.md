# Weather App

The assignment was to build a simple weather web app that shows today's weather and temperature, and a 5-day forecast using a weather API.

## The problem

For this project two designs were provided in xd-files. I choose to work with one of these and implement the different color sets depending on weahter. 

The design sketches was a base for my coding in Javascript. I interpreted the design as that the designer wanted me to showcase similar data from the APIs, but present it in different ways.

With that in mind, I was looking for a way to collect the same information from the different APIs one or more times. I found information about JavaScript classes, and thought that a Template with constructors would solve this for me. 

The Javascript class did not disappoint me. The biggest issue I had was how to use it with the filter and map method and then return it. To solve it, I needed a helping hand and there it was - an array with five objects presenting only the info it was told! Like magic :)

Unfortunately, the API I had for the forecast did not show two of the constructors, namely sunrise and sunset. I would have loved to showcase these in the desktop view. Now I had to set these to null in the forecast templates  - perhaps not the best solution but the one I could think of. 

For generating the HTML info I used both ways from our code sessions to get used to them. 

It was fun working with a design from a designer! I had never seen an xd-file before, but having all measurements, hex-codes, icons and fonts from start made the work in CSS so much easier. So much so that I took the time to include a CSS-grid for the first time.

If I had had more time, I would have added more weathers - snow's coming up, right? And in Gothenburg it's not all about what the temperature feels like, you have to know how the wind blows. After that, more cities would be added. Of course I have tested it with diffent cities to see if the colors and icon changed according to weather status. It did, and I'm happy with that. 

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
