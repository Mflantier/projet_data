// Affichage liste de tous les pays par continents
const affiche = document.querySelector('#selectContinent');
const submenu = document.querySelectorAll(".continent");
let url = (window.location['pathname'].split("/")).pop();
let tableauReponseFetch = [];
let region;
tableau = [];
newAPI = [];

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            for (i = 0; i < res.length; i++) {
                // Tri par continent
                // Europe
                if (url == 'europe' && res[i]['region'] == 'Europe') {
                    document.querySelector("h2").textContent = "Europe";
                    if (res[i]['alpha3Code'].toLowerCase() === "kos") {
                        tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                    } else {
                        tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                    }
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);

                } else if (url == 'asie' && res[i]['region'] == 'Asia') {
                    // Asie
                    document.querySelector("h2").textContent = "Asie";
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                } else if (url == 'amerique' && res[i]['region'] == 'Americas') {
                    // Amérique
                    document.querySelector("h2").textContent = "Amérique";
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);

                } else if (url == 'afrique' && res[i]['region'] == 'Africa') {
                    // Afrique
                    document.querySelector("h2").textContent = "Afrique";
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);

                } else if (url == 'oceanie' && res[i]['region'] == 'Oceania') {
                    // Océanie
                    document.querySelector("h2").textContent = "Océanie";
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);

                } else if (url == 'tous') {
                    // Tous les pays
                    document.querySelector("h2").textContent = "Tous les pays";
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                } else {
                    tableau.push(14);
                    console.log(tableau)
                }
                if (tableau[0] === 14) {

                    tableau = [];
                } else {

                    newAPI.push(tableau);
                    tableau = [];
                }
            }
            afficheListe(newAPI);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        })

    setTimeout(function () {
        callBack(newAPI);
    }, 1000);

}

function affichageLightBox(tab) {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const node = document.querySelectorAll('.liste-pays');
    for (i = 0; i < node.length; i++) {
        node[i].addEventListener('click', function (e) {
            let aCode = e.target.id;

            for (p = 0; p < tab.length; p++) {
                if (aCode == tab[p][1]) {
                    while (choice.firstChild) {
                        choice.removeChild(choice.firstChild);
                    }
                    if (tab[p][3] == "Europe") {
                        region = "Europe";
                    } else if (tab[p][3] == "Americas") {
                        region = "Amérique";
                    } else if (tab[p][3] == "Asia") {
                        region = "Asie";
                    } else if (tab[p][3] == "Africa") {
                        region = "Afrique";
                    } else if (tab[p][3] == "Oceania") {
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

                    nom.textContent = tab[p][0];
                    drapeau.innerHTML = '<img src="' + tab[p][2] + '" width="150" height="100">';
                    continent.innerHTML = '<strong>Continent : </strong>' + region;
                    capitale.innerHTML = '<strong>Capitale : </strong>' + tab[p][4];
                    population.innerHTML = '<strong>Population : </strong>' + tab[p][5];
                    superficie.innerHTML = '<strong>Superficie : </strong>' + tab[p][6] + ' ' + 'km<sup>2</sup>';
                    langue.innerHTML = '<strong>Langue : </strong>' + tab[p][7];
                    devise.innerHTML = '<strong>Devise : </strong>' + tab[p][8];
                    voisins.innerHTML = '<strong>Pays voisins : </strong>';
                    if (tab[p][9].length === 0) {
                        voisins.innerHTML = '<strong>Pays voisins : </strong> Aucun';
                    } else {
                        for (n = 0; n < tab[p][9].length; n++) {
                            fetch(`https://restcountries.eu/rest/v2/alpha/` + border[n])
                                .then((response) => {
                                    return response.json();
                                })
                                .then((response) => {
                                    let voisin = document.createElement("li");
                                    voisin.innerHTML = response['translations']['fr'];
                                    voisins.appendChild(voisin);
                                })
                        }
                    }

                    choice.appendChild(drapeau);
                    choice.appendChild(continent);
                    choice.appendChild(capitale);
                    choice.appendChild(population);
                    choice.appendChild(superficie);
                    choice.appendChild(langue);
                    choice.appendChild(devise);
                    choice.appendChild(voisins);
                }
            }
        })
    }
}

leFetch(affichageLightBox);

// Tri ordre alphabétique en français
function afficheListe(tab) {
    tab.sort(Intl.Collator().compare);
    z = 0;
    h = 0;
    for (i = 0; i < tab.length; i++) {
        let li = document.createElement("p");
        li.innerHTML = nomId[0];
        li.classList.add("liste-pays", "text-left");
        li.setAttribute('data-toggle', 'modal');
        li.setAttribute('data-target', '#choix');
        li.id = tab[i][1];

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