//Hamburger Menu
let hamburger= document.querySelector(".hamburger");
let navbar= document.querySelector('nav ul');
hamburger.addEventListener('click', ()=>{
    navbar.classList.toggle("toggle");
})




// Setting Current Date & Time
let day= document.querySelectorAll('.day');
let dateElem = document.getElementById('date') 
let d= new Date();
let cDay= d.getDay();
let cDate= d.getDate();
let cMonth= d.getMonth();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = [" January"," February"," March"," April"," May"," June"," July"," August"," September"," October"," November"," December"];
day.forEach((e)=>{
    if(cDay>=7){
        cDay=0;
    }
    e.textContent=weekday[cDay]
    cDay++
})
dateElem.textContent= cDate + month[cMonth];



let cityElem= document.getElementById("city");
let humid= document.getElementById("humid");
let windSpeed= document.getElementById("wind-speed");
let windDirection= document.getElementById("wind-direction");
let currentTemp= document.getElementById("current-temp");
let currentTempIMG= document.getElementById("current-weather-img");

let currentCity= "Meerut";

async function getWeather(city){
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4c22a1ab56msh7b02867ebcd08f2p1d36b0jsnd22cc0170fa6',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    //Setting up Today's Weather
	cityElem.textContent= result.location.city;
    let ctemp= Number(result.current_observation.condition.temperature);
    currentTemp.textContent= Math.round((ctemp-32)*5/9)+"°C";
    humid.textContent= result.current_observation.atmosphere.humidity+"%";
    windSpeed.textContent= result.current_observation.wind.speed+"km/h";
    windDirection.textContent= result.current_observation.wind.direction;
    let currentTexture= result.current_observation.condition.text;
    weatherIMG(currentTempIMG, currentTexture);

    //Setting up Forcast Weather
    let forcastIMG= document.querySelectorAll(".forcast-img");
    let forcastMaxTemp= document.querySelectorAll(".max-temp");
    let forcastMinTemp= document.querySelectorAll(".min-temp");
    for(let i=0; i<forcastIMG.length; i++){
        weatherIMG(forcastIMG[i], result.forecasts[i].text);
        let maxTemp= result.forecasts[i].high;
        forcastMaxTemp[i].textContent= Math.round((maxTemp-32)*5/9)+"°C";
        let minTemp= result.forecasts[i].low;
        forcastMinTemp[i].textContent= Math.round((minTemp-32)*5/9)+"°C";
    }

} catch (error) {
	console.error(error);
}
}


// Setting up Weather Image
function weatherIMG(elem,texture){
    if(texture.includes('Clear')) elem.src= "img/clear.svg";
    else if(texture.includes('Sunny')) elem.src= "img/sunny.svg";
    else if(texture.includes('Cloud')) elem.src= "img/cloudy.svg";
    else if(texture.includes('Rain')) elem.src= "img/rain.svg";
    else if(texture.includes('Thunder')) elem.src= "img/thunder.svg";
    else if(texture.includes('Haze')) elem.src= "img/haze.svg"
}


getWeather(currentCity);

//New Weather Search
let searchInput= document.getElementById("text-input");
let searchButton= document.getElementById("btn");
searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
})