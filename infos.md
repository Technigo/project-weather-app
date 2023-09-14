<!-- link and key to openweather api -->
openweather api: 71c1059590e3c92fe5d0130e08a97e30
https://home.openweathermap.org/
username: hasimausi@papierkorb.me
password: blablabla

<!-- design template -->
https://technigo-weagther-app-design-02.netlify.app/

<!-- specs for project  -->
design: https://technigo-weagther-app-design-02.netlify.app/ 

<!-- endpoint / object data description from api -->
endpoint: https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=89d1a944a381d671e0d7eca3b8362f21


<!-- Basic structure: -->
----- Box -------
<section>
MAYBE DIVS
few clouds | 20 °C  // container
sunrise 07:08       // container
sunset 20:20        // container
</section>
-------------

----- Box --------
Light a fire and get cosy. Stockholm is looking grey today.
------------------
Wed --- 13 °C

Thu --- 10 °C

Fri --- 13 °C

Sat --- 15 °C

Sun --- 15 °C

Type a city... //Search//

Created by: Technigo Education Team

-------------------------
Object:
<!-- this is the retrieved object, our variable for it is weatherObject -->
{

      "coord": {
            "lon": 18.0649,
            "lat": 59.3326
      },
      "weather": [
            {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04d"
            }
      ],
      "base": "stations",
      "main": {
            "temp": 14.66,
            "feels_like": 14.56,
            "temp_min": 13.92,
            "temp_max": 15.7,
            "pressure": 1011,
            "humidity": 91
      },
      "visibility": 10000,
      "wind": {
            "speed": 3.09,
            "deg": 60
      },
      "clouds": {
            "all": 75
      },
      "dt": 1694613032,
      "sys": {
            "type": 1,
            "id": 1788,
            "country": "SE",
            "sunrise": 1694578246,
            "sunset": 1694625433
      },
      "timezone": 7200,
      "id": 2673730,
      "name": "Stockholm",
      "cod": 200

}
