# What is an API (Application Programming Interface)
When your page are asking for data from a server. 
Many companies are opening themselves which means that you can sign up and ask for their API(datas), like Instagram for instance. 

API will allow you to fetch(hämta), modify and delete infomration from other systems. They are gatekeepers of systmes. 

# Authentication (Authorization)
You register yourself and in return the owner of the data gives you a token. Then you use the token everytime you are going to take som data. A token which is unique to every person. 
Sometimes you log in to webpage to get access to data/information, the login part is the token section of it. 

# Promises
When we are logging in to a page where the API is loading the data from the server, sometimes it can take seconds, sometimes a bit longer. While the API is loading we have to be able to click or continue to click around in the webpage as we want and the computer has to allow us to be able to do that. In other word our page need to work parallelly with several things and in order to do that we use Promises. Promises will allow us to send something that will take time to use and act on it when it comes back and meanwhile other code will run. 
Nedan har jag ännu en förklaring: 
fetch('http://whatever.com').then()   .then() är våran promises som gör att våra andra kod kommer att fortsätta fungera samtidigt som vår kod håller på att hämta datan via API.

# JSON (Javascrip Object Notation)
Our respons from a server comes always in a JSON format. Is a way of storing your JavaScript object as strings which can be passed back and forth. Basically a string version of an object. 