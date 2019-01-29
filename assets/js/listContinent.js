import affichageLightBox from './infoLightBox';

// Affichage liste de tous les pays par continents
const affiche = document.querySelector('#selectContinent');
let url = (window.location['pathname'].split("/")).pop();
let newAPI = [];
let tableau = [];
function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            for (let i = 0; i < res.length; i++) {
                // Tri par continent
                // Europe
                if (url == 'europe' && res[i]['region'] == 'Europe') {
                    document.querySelector("h2").textContent = "Europe";
                    if (res[i]['alpha3Code'].toLowerCase() === "kos") {
                        tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                    } else {
                        tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                    }
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
                    if (res[i]['alpha3Code'].toLowerCase() === "kos") {
                        tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                    } else {
                        tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                    }
                } else {
                    tableau.push(14); // Chiffre arbritaire, existe uniquement pour la remise à zero de la variable tableau
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

leFetch(affichageLightBox);

// Tri ordre alphabétique en français
function afficheListe(tab) {
    tab.sort(Intl.Collator().compare);
    let z = 0;
    let h = 0;
    let idcolonne;
    for (i = 0; i < tab.length; i++) {
        let newP = document.createElement("p");
        let svg = document.createElement("img");
        let content = document.createElement("div");

        svg.classList.add("miniFlag");
        svg.setAttribute("src", tab[i][2]);
        svg.setAttribute("width","30");
        svg.setAttribute("height","20");

        newP.innerHTML = tab[i][0];
        newP.classList.add("liste-pays", "text-center","text-lg-left", "pl-2", "m-0");
        newP.setAttribute('data-toggle', 'modal');
        newP.setAttribute('data-target', '#choix');
        newP.id = tab[i][1];

        content.classList.add("d-flex", "align-items-top", "pb-3");
        content.appendChild(svg);
        content.appendChild(newP);
        if (z === 0) {
            let div = document.createElement('div');
            div.classList.add("col-lg-3", "pr-0");
            div.setAttribute('id', 'colonne-' + h);
            affiche.appendChild(div);
            idcolonne = 'colonne-' + h;
        }
        let theColonne = document.querySelector('#' + idcolonne);
        theColonne.appendChild(content);
        if (z === Math.floor((tab.length) / 4)) {
            z = 0;
            h++;
        } else {
            z++
        }
    }
}