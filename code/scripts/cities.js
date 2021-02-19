/** This function returns a city object based on cityName parameter */
export const getCities = (cityName) => {
  const cities = [
    {
      name: "La Motte",
      position: {
        lat: 43.4914,
        long: 6.5369,
      },
    },
    {
      name: "Stockholm",
      position: {
        lat: 59.334591,
        long: 18.06324,
      },
    },
    {
      name: "Berlin",
      position: {
        lat: 52.520008,
        long: 13.404954,
      },
    },
  ];
  let city = {};

  cities.forEach((c) => {
    if (c.name === cityName) {
      city = c;
    }
  });

  return city;
};
