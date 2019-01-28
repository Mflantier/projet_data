// Affichage liste de tous les pays par continents
const affiche = document.querySelector('#selectContinent');
const submenu = document.querySelectorAll(".continent");
let url = (window.location['pathname'].split("/")).pop();
let tableauReponseFetch = [];
let region;

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            tableau = [];
            for (i = 0; i < res.length; i++) {
                // Tri par continent
                // Europe
                if (url == 'europe' && res[i]['region'] == 'Europe') {
                    document.querySelector("h2").textContent = "Europe";
                    tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    region = "Europe";
                } else if (url == 'asie' && res[i]['region'] == 'Asia') {
                    // Asie
                    document.querySelector("h2").textContent = "Asie";
                    tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    region = "Asie";
                } else if (url == 'amerique' && res[i]['region'] == 'Americas') {
                    // Amérique
                    document.querySelector("h2").textContent = "Amérique";
                    tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    region = "Amérique";
                } else if (url == 'afrique' && res[i]['region'] == 'Africa') {
                    // Afrique
                    document.querySelector("h2").textContent = "Afrique";
                    tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    region = "Afrique";
                } else if (url == 'oceanie' && res[i]['region'] == 'Oceania') {
                    // Océanie
                    document.querySelector("h2").textContent = "Océanie";
                    tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                    region = "Océanie";
                } else if (url == 'tous') {
                    // Tous les pays
                    document.querySelector("h2").textContent = "Tous les pays";
                    tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
                }
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
                    if(response["region"] == "Europe"){
                        region = "Europe";
                    } else if(response["region"] == "Americas"){
                        region = "Amérique";
                    } else if(response["region"] == "Asia"){
                        region = "Asie";
                    } else if(response["region"] == "Africa"){
                        region = "Afrique";
                    } else if(response["region"] == "Oceania"){
                        region = "Océanie";
                    }
                    let drapeau = document.createElement("p");
                    let continent = document.createElement("p");
                    let capitale = document.createElement("p");
                    let population = document.createElement("p");
                    let superficie = document.createElement("p");
                    let langue = document.createElement("p");
                    let devise = document.createElement("p");
                    let voisins = document.createElement("ul");
                    voisins.classList.add("p-0");

                    nom.textContent = response['translations']['fr'];
                    drapeau.innerHTML = '<img src="' + response['flag'] + '" width="150" height="100">';
            continent.innerHTML = '<strong>Continent : </strong>' + response['region'];
            capitale.innerHTML = '<strong>Capitale : </strong>' + response['capital'];
            population.innerHTML = '<strong>Population : </strong>' + response['population'];
            superficie.innerHTML = '<strong>Superficie : </strong>' + response['area'] +' '+ 'km<sup>2</sup>';
            langue.innerHTML = '<strong>Langue : </strong>' + response['languages'][0]['nativeName'];
            devise.innerHTML = '<strong>Devise : </strong>' + response['currencies'][0]['name'];
            voisins.innerHTML = '<strong>Pays voisins : </strong>';

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

// Tri ordre alphabétique en français
function afficheListe(tab) {
    tab.sort();
    z = 0;
    h = 0;
    for (t = 0; t < tab.length; t++) {
        let nomId = tab[t].split("#")
        let li = document.createElement("p");
        li.innerHTML = nomId[0];
        li.classList.add("liste-pays", "text-center");
        li.setAttribute('data-toggle', 'modal');
        li.setAttribute('data-target', '#choix');
        li.id = nomId[1];

        if (z === 0) {
            div = document.createElement('div');
            div.classList.add("col-lg-3");
            div.setAttribute('id', 'colonne-' + h);
            affiche.appendChild(div);
            idcolonne = 'colonne-' + h;
        }
        theColonne = document.querySelector('#' + idcolonne);
        theColonne.appendChild(li);
        if (z === Math.floor((tab.length) / 4)) {
            z = 0;
            h++;
        } else {
            z++
        }

    }
}