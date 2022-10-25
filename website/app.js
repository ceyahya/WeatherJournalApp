/* Global Variables */
const zip = document.getElementById("zip");
const feeling = document.getElementById("feelings");
const generate = document.getElementById("generate");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const post = 'http://localhost:8000/post';
const get = 'http://localhost:8000/get';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
// https://api.openweathermap.org/data/2.5/weather?zip={zip code},&appid={API key}
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// &units=metric to make temp Celsius 
let apiKey = ',&appid=9ce3d4f80be0945d4b3d455b1633598c&units=metric';

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", eventListener);

/* Function called by event listener */
function eventListener(e) {
    const data = {
        date: newDate,
        zipCode: zip.value,
        content: feeling.value
    }

    getData(baseURL, zip, apiKey)

    .then(function(result){
        // Add data
        data.temp = result.main.temp;
        postData(data);
        updateUI();
    })
}

/* Function to GET Web API Data*/
const getData = async (baseURL, zip, apiKey)=>{
    const res = await fetch(baseURL+zip.value+apiKey)
    try {
        const apiData = await res.json();
        return apiData;
    }  catch(error) {
        console.log("error in getData", error);
    }
}

/* Function to POST data */
const postData = async (data) => {
    const response = await fetch(post, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error in postData", error);
    }
}


/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch(get);
    try{
        const projectData = await request.json();
        date.innerHTML = projectData.date;
        temp.innerHTML = projectData.temp;
        content.innerHTML = projectData.content;

    }catch(error){
        console.log("error in updateUI", error);
    }
}