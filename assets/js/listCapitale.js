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
                    tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
                } else {
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders']);
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

// Affiche le pays selectionné
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
                    let drapeau = document.createElement("img");
                    let continent = document.createElement("p");
                    let capitale = document.createElement("p");
                    let population = document.createElement("p");
                    let superficie = document.createElement("p");
                    let langue = document.createElement("p");
                    let devise = document.createElement("p");
                    let voisins = document.createElement("ul");

                    nom.textContent = tab[p][0];
                    drapeau.setAttribute("src", tab[p][2]);
                    drapeau.setAttribute("width", "150");
                    drapeau.setAttribute("heigth", "100");
                    continent.innerHTML = 'Continent : ' + region;
                    capitale.innerHTML = 'Capitale : ' + tab[p][4];
                    population.innerHTML = 'Population : ' + tab[p][5];
                    superficie.innerHTML = 'Superficie : ' + tab[p][6] + ' Km<sup>2</sup>';
                    langue.innerHTML = 'Langue : ' + tab[p][7];
                    devise.innerHTML = 'Devise : ' + tab[p][8];
                    voisins.innerHTML = '<strong>Pays voisins : </strong>';

                    if (tab[p][9].length === 0) {
                        voisins.innerHTML = '<strong>Pays voisins : </strong> Aucun';
                    } else {
                        for (n = 0; n < tab[p][9].length; n++) {
                            fetch(`https://restcountries.eu/rest/v2/alpha/` + tab[p][9][n])
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
        let newP = document.createElement("p");
        newP.innerHTML = tab[i][0] + " - " + tab[i][4];
        newP.classList.add("liste-pays", "text-left");
        newP.setAttribute('data-toggle', 'modal');
        newP.setAttribute('data-target', '#choix');
        newP.id = tab[i][1];

        if (z === 0) {
            div = document.createElement('div');
            div.classList.add("col-lg-3");
            div.setAttribute('id', 'colonne-' + h);
            affiche.appendChild(div);
            idcolonne = 'colonne-' + h;
        }
        theColonne = document.querySelector('#' + idcolonne);
        theColonne.appendChild(newP);
        if (z === Math.floor((tab.length) / 4)) {
            z = 0;
            h++;
        } else {
            z++
        }

    }
}