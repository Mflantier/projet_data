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
                    devises(tab[p][8]);
                    langues(tab[p][10]);
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
                    // tab[p][10] = Langue du pays (en français)


                    nom.textContent = tab[p][0];
                    drapeau.innerHTML = '<img src="' + tab[p][2] + '" width="150" height="100">';
                    continent.innerHTML = '<strong>Continent : </strong>' + tab[p][3];
                    capitale.innerHTML = '<strong>Capitale : </strong>' + tab[p][4];
                    population.innerHTML = '<strong>Population : </strong>' + tab[p][5];
                    superficie.innerHTML = '<strong>Superficie : </strong>' + tab[p][6];

                    langue.innerHTML = '<strong>Langue : </strong><span id="valueLangue"></span> ';

                    devise.innerHTML = '<strong>Devise : </strong><span id="valueDevise"></span> ';


                    if (tab[p][9].length == 0) {
                        voisins.innerHTML = '<strong>Aucun pays voisin</strong>';
                    } else if (tab[p][9].length == 1) {
                        voisins.innerHTML = '<strong>Pays voisin : </strong>';
                    } else {
                        voisins.innerHTML = '<strong>Pays voisins : </strong>';
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