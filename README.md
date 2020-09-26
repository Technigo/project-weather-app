# Weather App

For this project we had to build a weather app that shows today's weather, temperature and 5 day forecast for a specified city. This was all to be achieved by using the open weather app api and fetching the data we required via the specific api links. The data had to be displayed in the DOM and the page needed to be styled to in order to create a simple looking weather app that was also responsive for mobile, tablet and desktop devices.  

## The problem
In order for me to create the weather app based on the blue level project requirements I started by following each step outlined in the project.
This helped me to follow a steady structure in terms of understanding what I was doing and why, especially when it came to accessing the data from the api as I'd never done this before. 
I felt that this was most of the time understandable, but sometimes I had to really sit down, do some console logs and write out what I needed to do. Especially when I had an array with objects. 

The most challenging out of both api fetches was the 5 day forecast, but only when it came to making it happen for each of the 5 days. I found it more methodical and easier to understand when I created the same block of code for each day. Whereas if I'd used a loop, I don't think I'd have really understood what was happening, because I'm still in the process of understanding loops. I understand that using a loop would have made my code shorter and also I would have saved some time creating the same block of code for each day. But as I mentioned I don't think I would have fully understood it and I wouldn't have felt confident explaining it to others.  

Once I'd accessed all the info from each of the api links via fetch, I started to connect it to my HTML document. On Monday's lecture this was done dynamically, which unfortuantely felt very advance for me. I decided to do it the way I knew and used document. getElementById.innerHTML after defining each tag in HTML. It was a similar situation when I was creating the same block of code for each day in the 5 day forecast, I understood this way of doing it, but I would like to try to access the HMTL code dynamically in future projects if it is needed.

The last thing to do was style my weather app and make it responsive. Here I feel more at home as I have worked previously with design, graphics and colours. In terms of the responsiveness I feel quite confident in this area. I look at all views on the mobile and tablet, landscape and portrait, and also how it looks on a desktop device. For the mobile view I decided to omit the background pattern and just have it so it fit the screen. As the screen get's wider the weather app is shown inside a container and a background pattern is applied. Also the five day forecast is in vertical lines, one after the other, on the mobile view. But on tablet and desktop, they change so they are viewd in horizontal boxes. 

If I'd have more time I'd like to have added a few more cities and have the colours on the app and pattern change depending on the temperature. 

Technologies & resources used:
1. HTML, CSS and JavaScript.
2. Googaling.
3. Stack overflow.
5. Advice and help from teammates and teachers. 

Things I've learnt:
1. How to work with and read api data.
2. How to access api data via fetch.
3. How to use json and create promises.
4. How to put information from the fetch into different HTML elements and how they can change depending upon what the api is returning. 
5. How to style a weather app and make it responsive for mobile, tablet and desktop devices. 

## View it live

https://hardcore-keller-653d90.netlify.app/
