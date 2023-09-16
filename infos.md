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
<!-- forecast object, our variable for it is forecastObject -->

{

      "cod": "200",
      "message": 0,
      "cnt": 40,
      "list": [
            {
                  "dt": 1694736000,
                  "main": {
                        "temp": 281.15,
                        "feels_like": 281.15,
                        "temp_min": 281.15,
                        "temp_max": 282.14,
                        "pressure": 1021,
                        "sea_level": 1021,
                        "grnd_level": 1019,
                        "humidity": 91,
                        "temp_kf": -0.99
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 58
                  },
                  "wind": {
                        "speed": 1.32,
                        "deg": 194,
                        "gust": 1.64
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-15 00:00:00"
            },
            {
                  "dt": 1694746800,
                  "main": {
                        "temp": 282.75,
                        "feels_like": 281.53,
                        "temp_min": 282.75,
                        "temp_max": 283.8,
                        "pressure": 1021,
                        "sea_level": 1021,
                        "grnd_level": 1019,
                        "humidity": 86,
                        "temp_kf": -1.05
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 83
                  },
                  "wind": {
                        "speed": 2.45,
                        "deg": 160,
                        "gust": 6.17
                  },
                  "visibility": 10000,
                  "pop": 0.05,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-15 03:00:00"
            },
            {
                  "dt": 1694757600,
                  "main": {
                        "temp": 285.84,
                        "feels_like": 285.41,
                        "temp_min": 285.84,
                        "temp_max": 285.84,
                        "pressure": 1023,
                        "sea_level": 1023,
                        "grnd_level": 1019,
                        "humidity": 86,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 92
                  },
                  "wind": {
                        "speed": 2.56,
                        "deg": 193,
                        "gust": 6.21
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-15 06:00:00"
            },
            {
                  "dt": 1694768400,
                  "main": {
                        "temp": 289.56,
                        "feels_like": 288.8,
                        "temp_min": 289.56,
                        "temp_max": 289.56,
                        "pressure": 1023,
                        "sea_level": 1023,
                        "grnd_level": 1020,
                        "humidity": 59,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 96
                  },
                  "wind": {
                        "speed": 3.34,
                        "deg": 217,
                        "gust": 5.73
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-15 09:00:00"
            },
            {
                  "dt": 1694779200,
                  "main": {
                        "temp": 291.21,
                        "feels_like": 290.22,
                        "temp_min": 291.21,
                        "temp_max": 291.21,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1019,
                        "humidity": 44,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 91
                  },
                  "wind": {
                        "speed": 4.43,
                        "deg": 205,
                        "gust": 5.94
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-15 12:00:00"
            },
            {
                  "dt": 1694790000,
                  "main": {
                        "temp": 289.12,
                        "feels_like": 288.29,
                        "temp_min": 289.12,
                        "temp_max": 289.12,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1019,
                        "humidity": 58,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 98
                  },
                  "wind": {
                        "speed": 3.73,
                        "deg": 204,
                        "gust": 7.01
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-15 15:00:00"
            },
            {
                  "dt": 1694800800,
                  "main": {
                        "temp": 286.83,
                        "feels_like": 286.29,
                        "temp_min": 286.83,
                        "temp_max": 286.83,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1019,
                        "humidity": 78,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 99
                  },
                  "wind": {
                        "speed": 2.76,
                        "deg": 187,
                        "gust": 7.62
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-15 18:00:00"
            },
            {
                  "dt": 1694811600,
                  "main": {
                        "temp": 288.43,
                        "feels_like": 288.1,
                        "temp_min": 288.43,
                        "temp_max": 288.43,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1019,
                        "humidity": 80,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.52,
                        "deg": 211,
                        "gust": 10.57
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-15 21:00:00"
            },
            {
                  "dt": 1694822400,
                  "main": {
                        "temp": 286.57,
                        "feels_like": 286.37,
                        "temp_min": 286.57,
                        "temp_max": 286.57,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1019,
                        "humidity": 92,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 95
                  },
                  "wind": {
                        "speed": 3.97,
                        "deg": 208,
                        "gust": 10.63
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-16 00:00:00"
            },
            {
                  "dt": 1694833200,
                  "main": {
                        "temp": 285.92,
                        "feels_like": 285.52,
                        "temp_min": 285.92,
                        "temp_max": 285.92,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1018,
                        "humidity": 87,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 99
                  },
                  "wind": {
                        "speed": 4.31,
                        "deg": 214,
                        "gust": 10.99
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-16 03:00:00"
            },
            {
                  "dt": 1694844000,
                  "main": {
                        "temp": 286.85,
                        "feels_like": 286.52,
                        "temp_min": 286.85,
                        "temp_max": 286.85,
                        "pressure": 1021,
                        "sea_level": 1021,
                        "grnd_level": 1018,
                        "humidity": 86,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.29,
                        "deg": 209,
                        "gust": 10.75
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-16 06:00:00"
            },
            {
                  "dt": 1694854800,
                  "main": {
                        "temp": 291.19,
                        "feels_like": 290.69,
                        "temp_min": 291.19,
                        "temp_max": 291.19,
                        "pressure": 1020,
                        "sea_level": 1020,
                        "grnd_level": 1017,
                        "humidity": 63,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 95
                  },
                  "wind": {
                        "speed": 5.1,
                        "deg": 213,
                        "gust": 8.51
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-16 09:00:00"
            },
            {
                  "dt": 1694865600,
                  "main": {
                        "temp": 292.92,
                        "feels_like": 292.41,
                        "temp_min": 292.92,
                        "temp_max": 292.92,
                        "pressure": 1019,
                        "sea_level": 1019,
                        "grnd_level": 1016,
                        "humidity": 56,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 79
                  },
                  "wind": {
                        "speed": 5.86,
                        "deg": 201,
                        "gust": 8.49
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-16 12:00:00"
            },
            {
                  "dt": 1694876400,
                  "main": {
                        "temp": 291.57,
                        "feels_like": 291.06,
                        "temp_min": 291.57,
                        "temp_max": 291.57,
                        "pressure": 1017,
                        "sea_level": 1017,
                        "grnd_level": 1014,
                        "humidity": 61,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 51
                  },
                  "wind": {
                        "speed": 5.17,
                        "deg": 188,
                        "gust": 8.82
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-16 15:00:00"
            },
            {
                  "dt": 1694887200,
                  "main": {
                        "temp": 288.02,
                        "feels_like": 287.63,
                        "temp_min": 288.02,
                        "temp_max": 288.02,
                        "pressure": 1016,
                        "sea_level": 1016,
                        "grnd_level": 1013,
                        "humidity": 79,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 68
                  },
                  "wind": {
                        "speed": 4.72,
                        "deg": 188,
                        "gust": 11.73
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-16 18:00:00"
            },
            {
                  "dt": 1694898000,
                  "main": {
                        "temp": 287.63,
                        "feels_like": 287.33,
                        "temp_min": 287.63,
                        "temp_max": 287.63,
                        "pressure": 1015,
                        "sea_level": 1015,
                        "grnd_level": 1012,
                        "humidity": 84,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 61
                  },
                  "wind": {
                        "speed": 4.61,
                        "deg": 195,
                        "gust": 12.27
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-16 21:00:00"
            },
            {
                  "dt": 1694908800,
                  "main": {
                        "temp": 287.12,
                        "feels_like": 286.77,
                        "temp_min": 287.12,
                        "temp_max": 287.12,
                        "pressure": 1013,
                        "sea_level": 1013,
                        "grnd_level": 1010,
                        "humidity": 84,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 71
                  },
                  "wind": {
                        "speed": 3.39,
                        "deg": 210,
                        "gust": 9.64
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-17 00:00:00"
            },
            {
                  "dt": 1694919600,
                  "main": {
                        "temp": 286.08,
                        "feels_like": 285.75,
                        "temp_min": 286.08,
                        "temp_max": 286.08,
                        "pressure": 1012,
                        "sea_level": 1012,
                        "grnd_level": 1009,
                        "humidity": 89,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 500,
                              "main": "Rain",
                              "description": "light rain",
                              "icon": "10n"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 2.55,
                        "deg": 276,
                        "gust": 5.4
                  },
                  "visibility": 10000,
                  "pop": 0.54,
                  "rain": {
                        "3h": 0.36
                  },
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-17 03:00:00"
            },
            {
                  "dt": 1694930400,
                  "main": {
                        "temp": 284.12,
                        "feels_like": 283.75,
                        "temp_min": 284.12,
                        "temp_max": 284.12,
                        "pressure": 1014,
                        "sea_level": 1014,
                        "grnd_level": 1010,
                        "humidity": 95,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 501,
                              "main": "Rain",
                              "description": "moderate rain",
                              "icon": "10d"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.19,
                        "deg": 17,
                        "gust": 8.24
                  },
                  "visibility": 10000,
                  "pop": 0.94,
                  "rain": {
                        "3h": 6.38
                  },
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-17 06:00:00"
            },
            {
                  "dt": 1694941200,
                  "main": {
                        "temp": 283.34,
                        "feels_like": 282.71,
                        "temp_min": 283.34,
                        "temp_max": 283.34,
                        "pressure": 1018,
                        "sea_level": 1018,
                        "grnd_level": 1014,
                        "humidity": 88,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 500,
                              "main": "Rain",
                              "description": "light rain",
                              "icon": "10d"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.93,
                        "deg": 349,
                        "gust": 10.05
                  },
                  "visibility": 10000,
                  "pop": 0.62,
                  "rain": {
                        "3h": 0.8
                  },
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-17 09:00:00"
            },
            {
                  "dt": 1694952000,
                  "main": {
                        "temp": 286.85,
                        "feels_like": 285.69,
                        "temp_min": 286.85,
                        "temp_max": 286.85,
                        "pressure": 1019,
                        "sea_level": 1019,
                        "grnd_level": 1016,
                        "humidity": 54,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 75
                  },
                  "wind": {
                        "speed": 4.76,
                        "deg": 339,
                        "gust": 6.69
                  },
                  "visibility": 10000,
                  "pop": 0.42,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-17 12:00:00"
            },
            {
                  "dt": 1694962800,
                  "main": {
                        "temp": 287.35,
                        "feels_like": 286,
                        "temp_min": 287.35,
                        "temp_max": 287.35,
                        "pressure": 1020,
                        "sea_level": 1020,
                        "grnd_level": 1017,
                        "humidity": 45,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 801,
                              "main": "Clouds",
                              "description": "few clouds",
                              "icon": "02d"
                        }
                  ],
                  "clouds": {
                        "all": 13
                  },
                  "wind": {
                        "speed": 3.71,
                        "deg": 327,
                        "gust": 6.19
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-17 15:00:00"
            },
            {
                  "dt": 1694973600,
                  "main": {
                        "temp": 282.98,
                        "feels_like": 282.16,
                        "temp_min": 282.98,
                        "temp_max": 282.98,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1019,
                        "humidity": 59,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 802,
                              "main": "Clouds",
                              "description": "scattered clouds",
                              "icon": "03n"
                        }
                  ],
                  "clouds": {
                        "all": 41
                  },
                  "wind": {
                        "speed": 1.98,
                        "deg": 334,
                        "gust": 2.64
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-17 18:00:00"
            },
            {
                  "dt": 1694984400,
                  "main": {
                        "temp": 281.69,
                        "feels_like": 281.32,
                        "temp_min": 281.69,
                        "temp_max": 281.69,
                        "pressure": 1023,
                        "sea_level": 1023,
                        "grnd_level": 1020,
                        "humidity": 65,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 86
                  },
                  "wind": {
                        "speed": 1.34,
                        "deg": 319,
                        "gust": 1.44
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-17 21:00:00"
            },
            {
                  "dt": 1694995200,
                  "main": {
                        "temp": 280.89,
                        "feels_like": 280.89,
                        "temp_min": 280.89,
                        "temp_max": 280.89,
                        "pressure": 1023,
                        "sea_level": 1023,
                        "grnd_level": 1020,
                        "humidity": 67,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 78
                  },
                  "wind": {
                        "speed": 0.84,
                        "deg": 300,
                        "gust": 0.94
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-18 00:00:00"
            },
            {
                  "dt": 1695006000,
                  "main": {
                        "temp": 280.27,
                        "feels_like": 280.27,
                        "temp_min": 280.27,
                        "temp_max": 280.27,
                        "pressure": 1023,
                        "sea_level": 1023,
                        "grnd_level": 1019,
                        "humidity": 68,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 802,
                              "main": "Clouds",
                              "description": "scattered clouds",
                              "icon": "03n"
                        }
                  ],
                  "clouds": {
                        "all": 44
                  },
                  "wind": {
                        "speed": 0.07,
                        "deg": 62,
                        "gust": 0.37
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-18 03:00:00"
            },
            {
                  "dt": 1695016800,
                  "main": {
                        "temp": 282.34,
                        "feels_like": 282.34,
                        "temp_min": 282.34,
                        "temp_max": 282.34,
                        "pressure": 1023,
                        "sea_level": 1023,
                        "grnd_level": 1019,
                        "humidity": 61,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 802,
                              "main": "Clouds",
                              "description": "scattered clouds",
                              "icon": "03d"
                        }
                  ],
                  "clouds": {
                        "all": 38
                  },
                  "wind": {
                        "speed": 0.65,
                        "deg": 169,
                        "gust": 0.94
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-18 06:00:00"
            },
            {
                  "dt": 1695027600,
                  "main": {
                        "temp": 286.91,
                        "feels_like": 285.59,
                        "temp_min": 286.91,
                        "temp_max": 286.91,
                        "pressure": 1022,
                        "sea_level": 1022,
                        "grnd_level": 1018,
                        "humidity": 48,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 81
                  },
                  "wind": {
                        "speed": 2.7,
                        "deg": 157,
                        "gust": 3.92
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-18 09:00:00"
            },
            {
                  "dt": 1695038400,
                  "main": {
                        "temp": 287.67,
                        "feels_like": 286.51,
                        "temp_min": 287.67,
                        "temp_max": 287.67,
                        "pressure": 1020,
                        "sea_level": 1020,
                        "grnd_level": 1016,
                        "humidity": 51,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 91
                  },
                  "wind": {
                        "speed": 4.37,
                        "deg": 153,
                        "gust": 5.75
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-18 12:00:00"
            },
            {
                  "dt": 1695049200,
                  "main": {
                        "temp": 286.9,
                        "feels_like": 286,
                        "temp_min": 286.9,
                        "temp_max": 286.9,
                        "pressure": 1017,
                        "sea_level": 1017,
                        "grnd_level": 1014,
                        "humidity": 64,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.6,
                        "deg": 152,
                        "gust": 7.32
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-18 15:00:00"
            },
            {
                  "dt": 1695060000,
                  "main": {
                        "temp": 285.69,
                        "feels_like": 284.93,
                        "temp_min": 285.69,
                        "temp_max": 285.69,
                        "pressure": 1015,
                        "sea_level": 1015,
                        "grnd_level": 1012,
                        "humidity": 74,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.79,
                        "deg": 156,
                        "gust": 9.64
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-18 18:00:00"
            },
            {
                  "dt": 1695070800,
                  "main": {
                        "temp": 285.77,
                        "feels_like": 285.1,
                        "temp_min": 285.77,
                        "temp_max": 285.77,
                        "pressure": 1013,
                        "sea_level": 1013,
                        "grnd_level": 1010,
                        "humidity": 77,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 500,
                              "main": "Rain",
                              "description": "light rain",
                              "icon": "10n"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.6,
                        "deg": 162,
                        "gust": 9.71
                  },
                  "visibility": 10000,
                  "pop": 0.33,
                  "rain": {
                        "3h": 0.12
                  },
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-18 21:00:00"
            },
            {
                  "dt": 1695081600,
                  "main": {
                        "temp": 286.75,
                        "feels_like": 286.15,
                        "temp_min": 286.75,
                        "temp_max": 286.75,
                        "pressure": 1011,
                        "sea_level": 1011,
                        "grnd_level": 1007,
                        "humidity": 76,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 4.06,
                        "deg": 153,
                        "gust": 9.75
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-19 00:00:00"
            },
            {
                  "dt": 1695092400,
                  "main": {
                        "temp": 287.13,
                        "feels_like": 286.59,
                        "temp_min": 287.13,
                        "temp_max": 287.13,
                        "pressure": 1008,
                        "sea_level": 1008,
                        "grnd_level": 1005,
                        "humidity": 77,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 803,
                              "main": "Clouds",
                              "description": "broken clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 79
                  },
                  "wind": {
                        "speed": 4.98,
                        "deg": 141,
                        "gust": 10.46
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-19 03:00:00"
            },
            {
                  "dt": 1695103200,
                  "main": {
                        "temp": 287.39,
                        "feels_like": 286.91,
                        "temp_min": 287.39,
                        "temp_max": 287.39,
                        "pressure": 1005,
                        "sea_level": 1005,
                        "grnd_level": 1002,
                        "humidity": 78,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04d"
                        }
                  ],
                  "clouds": {
                        "all": 90
                  },
                  "wind": {
                        "speed": 5.51,
                        "deg": 131,
                        "gust": 11.81
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-19 06:00:00"
            },
            {
                  "dt": 1695114000,
                  "main": {
                        "temp": 289.4,
                        "feels_like": 289.06,
                        "temp_min": 289.4,
                        "temp_max": 289.4,
                        "pressure": 1001,
                        "sea_level": 1001,
                        "grnd_level": 998,
                        "humidity": 76,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 500,
                              "main": "Rain",
                              "description": "light rain",
                              "icon": "10d"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 6.42,
                        "deg": 126,
                        "gust": 14.05
                  },
                  "visibility": 10000,
                  "pop": 0.34,
                  "rain": {
                        "3h": 0.24
                  },
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-19 09:00:00"
            },
            {
                  "dt": 1695124800,
                  "main": {
                        "temp": 287.47,
                        "feels_like": 287.41,
                        "temp_min": 287.47,
                        "temp_max": 287.47,
                        "pressure": 996,
                        "sea_level": 996,
                        "grnd_level": 993,
                        "humidity": 94,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 501,
                              "main": "Rain",
                              "description": "moderate rain",
                              "icon": "10d"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 7.63,
                        "deg": 132,
                        "gust": 14.88
                  },
                  "visibility": 6713,
                  "pop": 0.97,
                  "rain": {
                        "3h": 4.32
                  },
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-19 12:00:00"
            },
            {
                  "dt": 1695135600,
                  "main": {
                        "temp": 288.82,
                        "feels_like": 288.87,
                        "temp_min": 288.82,
                        "temp_max": 288.82,
                        "pressure": 993,
                        "sea_level": 993,
                        "grnd_level": 989,
                        "humidity": 93,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 501,
                              "main": "Rain",
                              "description": "moderate rain",
                              "icon": "10d"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 6.8,
                        "deg": 206,
                        "gust": 12.92
                  },
                  "visibility": 10000,
                  "pop": 1,
                  "rain": {
                        "3h": 8.26
                  },
                  "sys": {
                        "pod": "d"
                  },
                  "dt_txt": "2023-09-19 15:00:00"
            },
            {
                  "dt": 1695146400,
                  "main": {
                        "temp": 288.07,
                        "feels_like": 287.89,
                        "temp_min": 288.07,
                        "temp_max": 288.07,
                        "pressure": 996,
                        "sea_level": 996,
                        "grnd_level": 992,
                        "humidity": 87,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 100
                  },
                  "wind": {
                        "speed": 6.05,
                        "deg": 235,
                        "gust": 12.58
                  },
                  "visibility": 10000,
                  "pop": 0.8,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-19 18:00:00"
            },
            {
                  "dt": 1695157200,
                  "main": {
                        "temp": 286.44,
                        "feels_like": 286.17,
                        "temp_min": 286.44,
                        "temp_max": 286.44,
                        "pressure": 997,
                        "sea_level": 997,
                        "grnd_level": 994,
                        "humidity": 90,
                        "temp_kf": 0
                  },
                  "weather": [
                        {
                              "id": 804,
                              "main": "Clouds",
                              "description": "overcast clouds",
                              "icon": "04n"
                        }
                  ],
                  "clouds": {
                        "all": 88
                  },
                  "wind": {
                        "speed": 5.04,
                        "deg": 221,
                        "gust": 12.12
                  },
                  "visibility": 10000,
                  "pop": 0,
                  "sys": {
                        "pod": "n"
                  },
                  "dt_txt": "2023-09-19 21:00:00"
            }
      ],
      "city": {
            "id": 2673730,
            "name": "Stockholm",
            "coord": {
                  "lat": 59.3326,
                  "lon": 18.0649
            },
            "country": "SE",
            "population": 1000000,
            "timezone": 7200,
            "sunrise": 1694664782,
            "sunset": 1694711653
      }

}
