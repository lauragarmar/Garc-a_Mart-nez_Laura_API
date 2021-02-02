let cuerpo= document.getElementById("cuerpo");

/*  fetch("https://calendarific.com/api/v2/holidays?&api_key=16f912c9625c58a56df8017b58c31bdf64da6c87&country=ES&year=2021")
.then(datos => datos.json())
.then(json => {
    //console.log(datos_json);
    mostrar(json);
})

const mostrar = (json) => {
console.log(json);

}  */

fetch("http://api.openweathermap.org/data/2.5/weather?q=Malaga&amp&APPID=14e95eae08bdcd44f298164d48a2ad66")
.then(datos => datos.json())
.then(json => {
    //console.log(datos_json);
    mostrar(json);
})

const mostrar = (json) => {
console.log(json);

}
 



