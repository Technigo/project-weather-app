// Setting up DOM references
const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);

// Listening for user input in the search box
searchBox.addListener('places_changed', () => {
	const place = searchBox.getPlaces()[0];

	if (place == null) return;

	// Get latitude and latitude
	const latitude = place.geometry.location.lat();
	const longitude = place.geometry.location.lng();

	// Reset search input field
	searchElement.value = '';

	// Update location in weather app
	updateCity(longitude, latitude, place.formatted_address)
		.then(data => {
			// Update the UI
			updateUI(data);

			// Set current city in localStorage when API request is successful
			localStorage.setItem('longitude', data.weather.longitude);
			localStorage.setItem('latitude', data.weather.latitude);
			localStorage.setItem('place', data.weather.displayName);
		})
		.catch(err => console.log(err));
});

// When the user enters the site localStorage is checked for previous entered city
if (
	localStorage.getItem('longitude') &&
	localStorage.getItem('latitude') &&
	localStorage.getItem('place')
) {
	// Update location in weather app based on data in localStorage
	updateCity(
		localStorage.getItem('longitude'),
		localStorage.getItem('latitude'),
		localStorage.getItem('place')
	)
		.then(data => updateUI(data))
		.catch(err => console.log(err));
} else {
	// Remove info message on first page if weather data is loaded
	infoMessage.classList.remove('hide');
}
