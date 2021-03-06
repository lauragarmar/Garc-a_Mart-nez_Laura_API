let container = document.getElementById("container");
let answer = document.getElementById("answer");


let country = document.getElementById("country");
let city = document.getElementById("city");
let search = document.getElementById("search");
//let article = document.getElementById("article");



//tengo que hacer una variable con el selected??

const research = () => {
    fetch("https://calendarific.com/api/v2/countries?api_key=c6c57e5fdda1aafd83ada5c4d57e0c0994714d5a")
        .then(datos => datos.json())
        .then(json => {

            result(json);
        })

    const result = (json) => {
        // console.log(json.response.countries[0]);

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
    let now = new Date(); // Obtengo la fecha actual
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    // Obtengo la fecha de mañana
    let date = new Date(tomorrow.getTime() - 1);
    // Creo una fecha nueva que representa el último milisegundo del día de hoy
    //Para que si el día que se comprueba es festivo se ignore (en la API del tiempo da valores a partir de mañana)
    let selected = country.options[country.selectedIndex].value;

    let ci = city.value;
    if (!ci) {
        alert("Poner la ciudad es obligatorio");
        return; //esto hace que salgamos de la función que maneja el click
    }
    fetch(`https://calendarific.com/api/v2/holidays?&api_key=c6c57e5fdda1aafd83ada5c4d57e0c0994714d5a&country=${selected}&year=${date.getFullYear()}`)
        .then(datos => datos.json())

        .then(json => {
            // console.log(json);
            show(json);
        })


    const show = (json) => {
        //console.log(json.response.holidays);
        //1000-> milisegundos. 60 segundos, 60 minutos, 24 horas, 16 dias
        let newDate = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 16);
        //filtro el array para que me de la fecha de aquí a 16 días

        let hol = json.response.holidays.filter((day) => {
            let hDate = new Date(day.date.iso)

            return hDate > date && hDate < newDate;
            //como hDate tiene que ser mayor estricto que date estoy ignorando el día actual

        });



        //console.log(hol);

        if (hol.length == 0) {
            alert("No hay vacaciones disponibles en los próximos 16 días");
        }

        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${ci},${selected}&key=bbd5f56653824375a2681f64e4e7cf35`)

            .then(datos => {
                if (datos.status == 200) {
                    return datos.json();
                } else if (datos.status == 204) {
                    alert("La ciudad no se corresponde con el país. Introduce una ciudad correcta")
                }
            })
            //.catch((e) => { alert("La ciudad no se corresponde con el país. Introduce una ciudad correcta"); })
            .then(json => {
                // console.log(json);
                mostrar(json);
            })

        const mostrar = (json) => {
            console.log(json);
            while (answer.firstChild) {
                answer.removeChild(answer.firstChild)
            }
            for (let j = 0; j < hol.length; j++) {
                let holi = document.createElement("div");
                holi.classList.add("data__container");
                let p = document.createElement("p");
                p.classList.add("data__holiday")
                p.textContent = hol[j].name;

                let d = new Date(hol[j].date.iso).getTime() - date.getTime();
                //milisegundos del día de la fiesta - milisegundos de la fecha actual

                let res = Math.floor(d / (1000 * 60 * 60 * 24));
                //Math.floor porque tiene que ser los días completos
                //res dice los días de diferencia que hay entre la fecha actual y los días de fiesta
                let we = document.createElement("p");

                we.textContent = "Temperatura maxima: " + JSON.stringify(json.data[res - 1].max_temp);

                let min = document.createElement("p");

                min.textContent = "Temperatura minima: " + JSON.stringify(json.data[res - 1].min_temp);

                let datedef = document.createElement("p");
                datedef.textContent = "Fecha: " + json.data[res - 1].valid_date;
                let desc = document.createElement("p");
                desc.textContent = json.data[res - 1].weather.description;
                let icon = document.createElement("img");
                let img = json.data[res - 1].weather.icon;

                icon.src = `https://www.weatherbit.io/static/img/icons/${img}.png`;
                //antes de hacer el append eliminar todos los nodos de donde vas a hacer el append

                //padre 

                holi.appendChild(p);
                holi.appendChild(we);
                holi.appendChild(min);
                holi.appendChild(datedef);
                holi.appendChild(desc);
                holi.appendChild(icon);

                answer.appendChild(holi);



            }

        }
    }



});



