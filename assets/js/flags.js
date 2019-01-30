import affichageLightBox from './infoLightBox';

// Affichage des drapeaux
const affiche = document.querySelector('#flag');
let newAPI = [];
let tableau = [];

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {

            for (let i = 0; i < res.length; i++) {
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
                    tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], population, area, res[i]['languages'][0]['name'], res[i]['currencies'][0]['code'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
                } else {
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], population, area, res[i]['languages'][0]['name'], res[i]['currencies'][0]['code'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
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
        let contentDiv = document.createElement("div")
        let img = document.createElement("img");
        let newP = document.createElement("p");
        let button = document.createElement("button");

        contentDiv.classList.add("d-flex", "flex-column", "align-items-center", "p-2", "contentDiv");

        img.id = tab[i][1];
        img.classList.add("imagelb");
        img.setAttribute("src", tab[i][2]);
        img.setAttribute("width", "150");
        img.setAttribute("height", "100");
        img.setAttribute("data-toggle", "modal");
        img.setAttribute("data-target", "#choix");

        newP.innerHTML = tab[i][0];
        newP.id = tab[i][1];
        newP.classList.add("liste-pays", "text-center", "text-lg-left", "m-0");
        newP.setAttribute('data-toggle', 'modal');
        newP.setAttribute('data-target', '#choix');

        button.id = tab[i][1];
        button.classList.add("bouton");
        button.textContent = 'En savoir plus';
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#choix");
        button.setAttribute("value", "value_input");
        button.setAttribute("type", "button");

        if (z === 0) {
            let div = document.createElement('div');
            div.classList.add("col-lg-3");
            div.setAttribute('id', 'colonne-' + h);
            affiche.appendChild(div);
            idcolonne = 'colonne-' + h;
        }
        let theColonne = document.querySelector('#' + idcolonne);
        contentDiv.appendChild(img);
        contentDiv.appendChild(newP);
        contentDiv.appendChild(button);
        theColonne.appendChild(contentDiv);
        if (z === Math.floor((tab.length) / 4)) {
            z = 0;
            h++;
        } else {
            z++
        }
    }
}