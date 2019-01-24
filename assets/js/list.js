// Affichage liste de tous les pays
const pays = document.querySelector('#pays');
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

// Affichage le pays selectionné
function affichage(tab) {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const node = document.querySelectorAll('.liste-pays');
    for (i = 0; i < node.length; i++) {
        currentAlpha = tab[i];
        node[i].addEventListener('click', function (e) {
            let aCode = e.target.id;

            for (p = 0; p < tab.length; p++) {
                if (aCode == tab[p][1]) {
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

                        // tab[p][0] = Nom français du pays
                        // tab[p][1] = Alpha3Code du pays
                        // tab[p][2] = SVG du drapeau
                        // tab[p][3] = Continent du pays
                        // tab[p][4] = Capitale du pays
                        // tab[p][5] = Population du pays
                        // tab[p][6] = Superficie du pays
                        // tab[p][7] = Langue du pays (en langue locale ex. Angleterre = English)
                        // tab[p][8] = Devise du pays
                        // tab[p][9] = Pays limitrophe du pays

                    nom.textContent = tab[p][0];
                    drapeau.innerHTML = '<img src="' + tab[p][2] + '" width="150" height="100">';
                    continent.innerHTML = 'Continent : ' + tab[p][3];
                    capitale.innerHTML = 'Capitale : ' + tab[p][4];
                    population.innerHTML = 'Population : ' + tab[p][5];
                    superficie.innerHTML = 'Superficie : ' + tab[p][6];
                    langue.innerHTML = 'Langue : ' + tab[p][7];
                    devise.innerHTML = 'Devise : ' + tab[p][8];
                    if(tab[p][9].length == 0){
                        voisins.innerHTML = 'Aucun pays voisins';
                        console.log('Tableau vide');
                        console.log(tab[p][9]);
                    } else {
                        voisins.innerHTML = 'Pays voisins : ';
                        console.log('Tableau avec éléments');
                        border = tab[p][9];
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
leFetch(affichage);

// Tri ordre alphabétique en français
function afficheListe(tab) {
    tab.sort(Intl.Collator().compare);
    for (i = 0; i < tab.length; i++) {
        let li = document.createElement("p");
        li.innerHTML = tab[i][0];
        li.classList.add("liste-pays", "text-center");
        li.setAttribute('data-toggle', 'modal');
        li.setAttribute('data-target', '#choix');
        li.id = tab[i][1];
        pays.appendChild(li);
    }
}