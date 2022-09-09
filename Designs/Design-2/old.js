const weekdays = document.getElementById('weekdays')
const days = [
    {
        name: 'mon',
        degree: 23
    },
    {
        name: 'tue',
        degree: 12
    },
    {
        name: 'wed',
        degree: 23
    },
    {
        name: 'thurs',
        degree: 23
    },
    {
        name: 'fri',
        degree: 23
    },
    {
        name: 'sat',
        degree: 23
    },
    {
        name: 'sun',
        degree: -5
    },
]

// Version 1 (a bit ugly)
let html = ''
days.forEach((day) => {
    html = html + `<div class="row">
        <p>${day.name}</p>
        <p>${day.degree}</p>
    </div>`
})
weekdays.innerHTML = html

// Cleaner version with map
weekdays.innerHTML = days.map((day) => {
    return `<div class="row">
        <p>${day.name}</p>
        <p>${day.degree}</p>
    </div>`
}).join('')

// function functionName(yourArgument) {
//     console.log(yourArgument);
// } 

// const funtionName = (yourArgument) => {
//     console.log(yourArgument);
// } 

// (yourArgument) => {
//     console.log(yourArgument);
// } 