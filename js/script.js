let cuerpo= document.getElementById("cuerpo");

fetch("http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1527811200&opacity=0.9&fill_bound=true&appid={API key}")
.then(datos => datos.json())
.then(json => {
    //console.log(datos_json);
    mostrar(json)
})

const mostrar = (json) => {
console.log(json);

}




