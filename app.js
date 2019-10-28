const cityForm = document.querySelector('form');

cityForm.addEventListener('submit', e => {
	e.preventDefault();

	const city = cityForm.city.value.trim();
	cityForm.reset();

	updateCity(city)
		.then(data => {
			updateUI(data);

			// Set city in localStorage if API request was successful
			localStorage.setItem('city', city);
		})
		.catch(err => displayError(err));
});

if (localStorage.getItem('city')) {
	updateCity(localStorage.getItem('city'))
		.then(data => updateUI(data))
		.catch(err => displayError(err));
}
