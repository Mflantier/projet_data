// Affichage liste de tous les pays par continents
const affiche = document.querySelector('#selectContinent');
const submenu = document.querySelectorAll(".continent");
let url = window.location['pathname'];
fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        for (i = 0; i < 250; i++) {
            if (url == '/continent/europe') {
                // Europe
                if (res[i]['region'] == 'Europe') {
                    let li = document.createElement("li");
                    li.innerHTML = res[i]['translations']['fr'];
                    li.classList.add("liste-pays");
                    li.id = res[i]['alpha3Code'].toLowerCase();
                    affiche.appendChild(li);
                }
            } else if (url == '/continent/asie') {
                // Asie
                if (res[i]['region'] == 'Asia') {
                    let li = document.createElement("li");
                    li.innerHTML = res[i]['translations']['fr'];
                    li.classList.add("liste-pays");
                    li.id = res[i]['alpha3Code'].toLowerCase();
                    affiche.appendChild(li);
                }
            } else if (url == '/continent/amerique') {
                // Amérique
                if (res[i]['region'] == 'Americas') {
                    let li = document.createElement("li");
                    li.innerHTML = res[i]['translations']['fr'];
                    li.classList.add("liste-pays");
                    li.id = res[i]['alpha3Code'].toLowerCase();
                    affiche.appendChild(li);
                }
            } else if (url == '/continent/afrique') {
                // Afrique
                if (res[i]['region'] == 'Africa') {
                    let li = document.createElement("li");
                    li.innerHTML = res[i]['translations']['fr'];
                    li.classList.add("liste-pays");
                    li.id = res[i]['alpha3Code'].toLowerCase();
                    affiche.appendChild(li);
                }
            } else if (url == '/continent/oceanie') {
                // Océanie
                if (res[i]['region'] == 'Oceania') {
                    let li = document.createElement("li");
                    li.innerHTML = res[i]['translations']['fr'];
                    li.classList.add("liste-pays");
                    li.id = res[i]['alpha3Code'].toLowerCase();
                    affiche.appendChild(li);
                }
            } else if (url == '/continent/tous') {
                let li = document.createElement("li");
                li.innerHTML = res[i]['translations']['fr'];
                li.classList.add("liste-pays");
                li.id = res[i]['alpha3Code'].toLowerCase();
                affiche.appendChild(li);
            } else {
                affiche.innerHTML("Un problème est survenu lors du chargement des données");
            }
        };
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })