let container = document.getElementById("container");

let country = document.getElementById("country");
let city=document.getElementById("city");
let search = document.getElementById("search");
let article = document.getElementById("article");



//tengo que hacer una variable con el selected??

const research = () => {
    fetch("https://calendarific.com/api/v2/countries?api_key=16f912c9625c58a56df8017b58c31bdf64da6c87")
        .then(datos => datos.json())
        .then(json => {

            result(json);
        })

    const result = (json) => {
        console.log(json.response.countries[0]);

        for (let i = 0; i < json.response.countries.length; i++) {
            let option = document.createElement("option");

            option.value = json.response.countries[i]["iso-3166"];
            option.textContent = json.response.countries[i].country_name;
            country.appendChild(option);
        }


    }
}



document.addEventListener("DOMContentLoaded", research);

//document.addEventListener("DOMContentLoaded", mostrar);

search.addEventListener("click", () => {
    let date = new Date(2021, 03, 01);
    let selected = country.options[country.selectedIndex].value;
    fetch(`https://calendarific.com/api/v2/holidays?&api_key=16f912c9625c58a56df8017b58c31bdf64da6c87&country=${selected}&year=${date.getFullYear()}`)
        .then(datos => datos.json())
        .then(json => {
            console.log(json);
            show(json);
        })

    const show = (json) => {
        console.log(json.response.holidays);
        //1000-> milisegundos. 60 segundos, 60 minutos, 24 dias, 7 semana
        let newDate = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7);

        let hol = json.response.holidays.filter((day) => {
            let hDate = new Date(day.date.iso)

            return hDate > date && hDate < newDate;
        });
        console.log(hol);

        fetch("https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=bbd5f56653824375a2681f64e4e7cf35")

            .then(datos => datos.json())
            .then(json => {
                //console.log(datos_json);
                mostrar(json);
            })

        const mostrar = (json) => {
            console.log(json);


        }
    }



});



