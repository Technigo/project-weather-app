const apiUrl = 'https://api.spacexdata.com/v3/launches';
const launchCountHeader = document.getElementById("launchCount");
const container = document.getElementById("main");

console.log('API Fetch Starting')


fetch(apiUrl).then((response) => {
    console.log(`Response OK? ${response.ok}`);
    console.log(`Response Status: ${response.status}`);
    console.log(`API Response Received`);
    return response.json()
}).then((data) => {
    console.log(`Data: ${data}`);
    console.log(`Length: ${data.length}`);
    launchCountHeader.innerHTML = `${data.length}`;

    data.forEach((launch) => {
        const wasSuccessful = launch.launch_success;
        const imageSrc = wasSuccessful ? 'success.png' : 'failure.png';
        //container.innerHTML += `<img src=${imageSrc}> </img>`;
        
        // Alt 1 one row picture and text
        //container.innerHTML += `<p>${launch.flight_number}: ${launch.mission_name}: <img src=${imageSrc}> </img> </p>`;
        
        // Alt 2 one row picture and text
        

        let launchHTML = ``;
        launchHTML += `<section class="launch">`;
        launchHTML += `<p>${launch.flight_number}: ${launch.mission_name}</p>`
        launchHTML += ` <img src=${imageSrc}></img>`;
        launchHTML += `</section>`

        container.innerHTML += launchHTML;
    })
})

console.log('API Fetch Initiated')