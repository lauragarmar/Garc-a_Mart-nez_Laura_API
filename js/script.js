let container = document.getElementById("container");

let country=document.getElementById("country");
let search=document.getElementById("search");
let holiday=document.getElementById("holiday");
let article= document.getElementById("article");
//tengo que hacer una variable con el selected??


//fetch("https://pro.openweathermap.org/data/2.5/forecast/climate?zip=94040,us&appid=14e95eae08bdcd44f298164d48a2ad66")
//fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html") 
fetch("http://api.openweathermap.org/data/2.5/weather?q=Andalucia&amp&APPID=14e95eae08bdcd44f298164d48a2ad66")

.then(datos => datos.json())
    .then(json => {
        //console.log(datos_json);
        mostrar(json);
    })

const mostrar = (json) => {
    console.log(json);
    let option = document.createElement("option");
   
    option.value =json.name;
    option.textContent = json.name;
    country.appendChild(option);

}

const research= ()=>{
    fetch("https://calendarific.com/api/v2/holidays?&api_key=16f912c9625c58a56df8017b58c31bdf64da6c87&country=ES&year=2021")
    .then(datos => datos.json())
    .then(json => {
        //console.log(datos_json);
        result(json);
    })
    
    const result = (json) => {
    console.log(json);
    /*let option = document.createElement("option");
   
     option.value =;
    option.textContent = ; 
    country.appendChild(option);*/
    for (let pais of json.response.holidays) {
        let option = document.createElement("option");
        console.log(pais);
        option.value =pais.country.name;
        option.textContent =pais.country.name;
        holiday.appendChild(option);

    }
    
    } 
}

document.addEventListener("DOMContentLoaded", research);
/* search.addEventListener("click", research); */
document.addEventListener("DOMContentLoaded", mostrar);



