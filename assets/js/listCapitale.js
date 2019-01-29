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
                if (res[i]['alpha3Code'].toLowerCase() === "kos") {
                    tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['code'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
                } else {
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['code'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
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
        newP.innerHTML = tab[i][0] + " - " + tab[i][4];
        newP.classList.add("liste-pays", "text-left");
        newP.setAttribute('data-toggle', 'modal');
        newP.setAttribute('data-target', '#choix');
        newP.id = tab[i][1];

        if (z === 0) {
            let div = document.createElement('div');
            div.classList.add("col-lg-3");
            div.setAttribute('id', 'colonne-' + h);
            affiche.appendChild(div);
            idcolonne = 'colonne-' + h;
        }
        let theColonne = document.querySelector('#' + idcolonne);
        theColonne.appendChild(newP);
        if (z === Math.floor((tab.length) / 4)) {
            z = 0;
            h++;
        } else {
            z++
        }

    }
}

function langues(iso) {
    fetch('/langues')
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            for (i = 0; i < res.length; i++) {
                if (res[i]["Alpha3b_Code"] === iso) {
                    document.getElementById("valueLangue").innerText = res[i]["French_Name"].charAt(0).toUpperCase() + res[i]["French_Name"].slice(1);
                    return;
                }
            }
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
}
function devises(currency) {
    fetch('/devises')
        .then((res) => {
            return res.json();
        })
        .then((res) => {
           
            for (i = 0; i < res.length; i++) {
              
                if (res[i]["ISO_devise"] === currency) {
                    console.log(res[i]["ISO_devise"]);
                    document.getElementById("valueDevise").innerText = res[i]["Devise"].charAt(0).toUpperCase() + res[i]["Devise"].slice(1);
                    return;
                }
            }
        })
               .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
}