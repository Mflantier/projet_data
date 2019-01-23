// Affichage liste de tous les pays par continents
const affiche = document.querySelector('#selectContinent');
const submenu = document.querySelectorAll(".continent");
let url = window.location['pathname'];
let tableauReponseFetch = [];

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            tableau = [];
            for (i = 0; i < res.length; i++) {
                if (url == '/continent/europe') {
                    // Europe
                    document.querySelector("h2").textContent = "Europe";
                    if (res[i]['region'] == 'Europe') {
                        tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    }
                } else if (url == '/continent/asie') {
                    // Asie
                    document.querySelector("h2").textContent = "Asie";
                    if (res[i]['region'] == 'Asia') {
                        tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    }
                } else if (url == '/continent/amerique') {
                    // Amérique
                    document.querySelector("h2").textContent = "Amérique";
                    if (res[i]['region'] == 'Americas') {
                        tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    }
                } else if (url == '/continent/afrique') {
                    // Afrique
                    document.querySelector("h2").textContent = "Afrique";
                    if (res[i]['region'] == 'Africa') {
                        tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    }
                } else if (url == '/continent/oceanie') {
                    // Océanie
                    document.querySelector("h2").textContent = "Océanie";
                    if (res[i]['region'] == 'Oceania') {
                        tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    }
                } else if (url == '/continent/tous') {
                    // Tous les pays
                    document.querySelector("h2").textContent = "Tous les pays";
                    tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                };
            }
            afficheListe(tableau);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        })

    setTimeout(function () {
        callBack();
    }, 1000);

}

function affichageLightBox() {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const node = document.querySelectorAll('.liste-pays');
    for (i = 0; i < node.length; i++) {
        node[i].addEventListener('click', function (e) {
            let aCode = e.target.id;

            fetch(`https://restcountries.eu/rest/v2/alpha/` + aCode)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    while (choice.firstChild) {
                        choice.removeChild(choice.firstChild);
                    }
                    let drapeau = document.createElement("p");
                    let continent = document.createElement("p");
                    let capitale = document.createElement("p");
                    let population = document.createElement("p");
                    let superficie = document.createElement("p");
                    let langue = document.createElement("p");
                    let devise = document.createElement("p");
                    let voisins = document.createElement("ul");

                    nom.textContent = response['translations']['fr'];
                    drapeau.innerHTML = '<img src="' + response['flag'] + '" width="150" height="100">';
                    continent.innerHTML = 'Continent : ' + response['region'];
                    capitale.innerHTML = 'Capitale : ' + response['capital'];
                    population.innerHTML = 'Population : ' + response['population'];
                    superficie.innerHTML = 'Superficie : ' + response['area'];
                    langue.innerHTML = 'Langue : ' + response['languages'][0]['nativeName'];
                    devise.innerHTML = 'Devise : ' + response['currencies'][0]['name'];
                    voisins.innerHTML = 'Pays voisins : ';

                    for (i = 0; i < response['borders'].length; i++) {
                        fetch(`https://restcountries.eu/rest/v2/alpha/` + response['borders'][i])
                            .then((response) => {
                                return response.json();
                            })
                            .then((response) => {
                                let voisin = document.createElement("li");
                                voisin.innerHTML = response['translations']['fr'];
                                voisins.appendChild(voisin);
                            })
                    }
                    choice.appendChild(drapeau);
                    choice.appendChild(continent);
                    choice.appendChild(capitale);
                    choice.appendChild(population);
                    choice.appendChild(superficie);
                    choice.appendChild(langue);
                    choice.appendChild(devise);
                    choice.appendChild(voisins);
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    };
                })
        })
    }
}

leFetch(affichageLightBox);

function afficheListe(tab) {
    tab.sort();
    for (t = 0; t < tab.length; t++) {
        let nomId = tab[t].split("#")
        console.log(nomId);
        console.log(nomId[0]);
        let li = document.createElement("p");
        li.innerHTML = nomId[0];
        li.classList.add("liste-pays", "text-center", "col-12", "col-sm-6", "col-md-3", "col-lg-3", "col-xl-3");
        li.setAttribute('data-toggle', 'modal');
        li.setAttribute('data-target', '#choix');
        li.id = nomId[1];
        affiche.appendChild(li);
    }
}