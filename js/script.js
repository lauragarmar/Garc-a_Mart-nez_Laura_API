let container = document.getElementById("container");

let country=document.getElementById("country");
let search=document.getElementById("search");
let holiday=document.getElementById("holiday");
let article= document.getElementById("article");
//tengo que hacer una variable con el selected??



fetch("http://api.openweathermap.org/data/2.5/weather?q=Malaga&amp&APPID=14e95eae08bdcd44f298164d48a2ad66")
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
    let option = document.createElement("option");
   
   /*  option.value =;
    option.textContent = ; */
    country.appendChild(option);
    
    } 
}

document.addEventListener("DOMContentLoaded", mostrar);
search.addEventListener("click", research);



