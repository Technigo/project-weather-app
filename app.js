const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener('places_changed', () => {
	const place = searchBox.getPlaces()[0];
	if (place == null) return;
	const latitude = place.geometry.location.lat();
	const longitude = place.geometry.location.lng();
	console.log(place);
	// console.log(longitude, latitude);

	updateCity(longitude, latitude, place.formatted_address)
		.then(data => {
			// Update the UI
			updateUI(data);
			console.log(data);
			// Set city in localStorage if API request was successful
			localStorage.setItem('longitude', data.weather.longitude);
			localStorage.setItem('latitude', data.weather.latitude);
			localStorage.setItem('place', data.weather.displayName);
		})
		.catch(err => displayError(err));
});

// cityForm.addEventListener('submit', e => {
// 	e.preventDefault();

// 	const city = cityForm.city.value.trim();
// 	cityForm.reset();

// 	updateCity(city)
// 		.then(data => {
// 			updateUI(data);

// 			// Set city in localStorage if API request was successful
// 			localStorage.setItem('city', city);
// 		})
// 		.catch(err => displayError(err));
// });

if (
	localStorage.getItem('longitude') &&
	localStorage.getItem('latitude') &&
	localStorage.getItem('place')
) {
	updateCity(
		localStorage.getItem('longitude'),
		localStorage.getItem('latitude'),
		localStorage.getItem('place')
	)
		.then(data => updateUI(data))
		.catch(err => displayError(err));
}
