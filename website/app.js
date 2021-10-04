//load the program after the window is loaded
window.addEventListener('load',() => { 

/* Global Variables */
//my api key
const OpenWeatherMap_apiKey = '8e82ae871b5b9a6328fd5b21737096fe';
// The generate botton to add event listener to it.
const Client_generateBtn = document.querySelector('#generate');
// I select these elements to get it's values when the user click on generate button.
const Client_zipInput = document.querySelector('#zip');
const Client_feelings = document.querySelector('#feelings');
// The entry section to display the data on it.
const Client_entryData = document.querySelector('.entry');
// select the items to add fetched data to it.
// select the date element
const dateEl = document.querySelector('#date');
// select the content element to display feelings
const contentEl = document.querySelector('#content');
// select the temp element
const tempEl = document.querySelector('#temp');
// create an element to store the description in it
const descriptionEl = document.createElement('div');
// insert that element right after the temp dev 
tempEl.insertAdjacentElement('afterend',descriptionEl );

// select the body to change its background when page is loaded depending on day and night 
const body = document.querySelector('body');

// Create a new date instance dynamically with JS
let d = new Date();
// i used backtics because i think it is more readable.
// added one to the month because it starts from 0 
let newDate = `${d.getMonth()+1} / ${d.getDate()} / ${d.getFullYear()}`;

/* added extra feature to make my project stand out */
// when it's between 6pm and 4am give the background dark mode
if(d.getHours()>=18 || d.getHours() <= 4 ){
    body.classList.add('night');
    // make text color white for more contrast
    Client_entryData.style.color = 'white';
}else{
    // from 4am to 6pm
    body.classList.add('morning');
}

//  url -> https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}


Client_generateBtn.addEventListener('click', async () => {
        // make a new date istance to be updated with every click
        let nowD = new Date();
        // a var to get the current temp for the entered zip code
        let newTemp ;
        // a var to get the weather description from weather array
        let newDescription ;

        //create a dynamic URL with zip code and my api key
        let OpenWeatherMap_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${Client_zipInput.value}&appid=${OpenWeatherMap_apiKey}`;

        // I used axios insted of fetch to test my understanding and my ability to use different and external librarries like axios and also to flex a bit. 
        // I know axios uses fetch.

        axios.get(OpenWeatherMap_URL).then( res => {
            // save the temp from the response
            newTemp =  res.data.main.temp;
            // save the description from the response in the weather array
            newDescription =  res.data.weather[0].description;
            console.log( newTemp , newDescription);
           // Send a POST request using axios
            axios({
                method: 'post',
                url: '/postApiData',
                data: {
                    date: newDate,
                    temp: newTemp,
                    feelings: Client_feelings.value,
                    description: newDescription
                }
            });
            axios.get('/getApiData').then( res => {
                console.log(res);
                console.log(' from the get route');
            });
            dateEl.innerHTML = `Date: ${newDate} || Time: ${nowD.getHours()} : ${nowD.getMinutes()}`;
            contentEl.innerHTML = `Feelings: ${Client_feelings.value}`;
            let tempInC = newTemp - 273.15;
            let tempInF = (tempInC * (9/5)) +32;
            tempEl.innerHTML = `Temp: ${tempInC.toFixed(2)}°C | ${tempInF.toFixed(2)}°F `;
            descriptionEl.innerHTML = ` Description: ${newDescription} `;

        }).catch(err => {
            alert(err);
            alert('please enter a valid zip code')
        });
});

});