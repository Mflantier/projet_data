import affichageLightBox from './infoLightBox';

// Affichage liste de toutes les capitales
const affiche = document.querySelector('#pays');
let newAPI = [];
let tableau = [];

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            for (i = 0; i < res.length; i++) {
                let population;
                if (typeof (res[i]['population']) == "number") {
                    population = res[i]['population'];
                    population = population.toLocaleString('fr-FR');
                } else {
                    population = res[i]['population'];
                }
                let area;
                if (typeof (res[i]['area']) == "number") {
                    area = res[i]['area'];
                    area = area.toLocaleString('fr-FR');
                } else {
                    area = res[i]['area'];
                }
                if (res[i]['alpha3Code'].toLowerCase() === "kos") {
                    tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], population, area, res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['code'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
                } else {
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], population, area, res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['code'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
                }
                newAPI.push(tableau);
                tableau = [];
            };
            afficheListe(newAPI);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
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
    for (let i = 0; i < tab.length; i++) {
        let newP = document.createElement("p");
        let svg = document.createElement("img");
        let content = document.createElement("div");

        svg.classList.add("miniFlag");
        svg.setAttribute("src", tab[i][2]);
        svg.setAttribute("width","30");
        svg.setAttribute("height","20");

        newP.innerHTML = tab[i][0] + " - " + tab[i][4];
        newP.classList.add("liste-pays", "text-center", "text-lg-left", "pl-2", "m-0");
        newP.setAttribute('data-toggle', 'modal');
        newP.setAttribute('data-target', '#choix');
        newP.id = tab[i][1];

        content.classList.add("d-flex", "align-items-top", "pb-4");
        content.appendChild(svg);
        content.appendChild(newP);
        if (z === 0) {
            let div = document.createElement('div');
            div.classList.add("col-lg-3");
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