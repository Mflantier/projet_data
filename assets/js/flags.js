// Affichage des drapeaux
const affiche = document.querySelector('#flag');
newAPI = [];
tableau = [];

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {

            for (i = 0; i < res.length; i++) {
                if (res[i]['alpha3Code'].toLowerCase() === "kos") {
                    tableau.push('Kosovo', res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
                } else {
                    tableau.push(res[i]['translations']['fr'], res[i]['alpha3Code'].toLowerCase(), res[i]['flag'], res[i]['region'], res[i]['capital'], res[i]['population'], res[i]['area'], res[i]['languages'][0]['nativeName'], res[i]['currencies'][0]['name'], res[i]['borders'], res[i]['languages'][0]['iso639_2']);
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
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains("liste-pays") || e.target.classList.contains("bouton")) {
            let aCode = e.target.id;


            for (let p = 0; p < tab.length; p++) {
                if (aCode == tab[p][1]) {

                    langues(tab[p][10]);
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
                    continent.innerHTML = '<strong>Continent :  </strong>' + region;
                    capitale.innerHTML = '<strong>Capitale :  </strong>' + tab[p][4];
                    population.innerHTML = '<strong>Population :  </strong>' + tab[p][5];
                    superficie.innerHTML = '<strong>Superficie :  </strong>' + tab[p][6] + ' Km<sup>2</sup>';

                    langue.innerHTML = '<strong>Langue : </strong><span id="valueLangue"></span> ';
                    
                    
                    devise.innerHTML = '<strong>Devise :  </strong>' + tab[p][8];
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
        } else if (e.target.classList.contains("imagelb")) {
            let aCode = e.target.id;

            for (p = 0; p < tab.length; p++) {
                if (aCode == tab[p][1]) {
                    while (choice.firstChild) {
                        choice.removeChild(choice.firstChild);
                    }
                    let drapeau = document.createElement("img");

                    nom.textContent = tab[p][0];
                    drapeau.setAttribute("src", tab[p][2]);
                    drapeau.setAttribute("width", "100%");
                    drapeau.setAttribute("heigth", "75%")
                    choice.appendChild(nom);
                    choice.appendChild(drapeau);
                }
            }
        }
    })

}

leFetch(affichageLightBox);

// Tri ordre alphabétique en français
function afficheListe(tab) {
    tab.sort(Intl.Collator().compare);
    z = 0;
    h = 0;
    for (i = 0; i < tab.length; i++) {
        let contentDiv = document.createElement("div")
        let img = document.createElement("img");
        let newP = document.createElement("p");
        let button = document.createElement("button");

        contentDiv.classList.add("p-2", "contentDiv");

        img.id = tab[i][1];
        img.classList.add("imagelb");
        img.setAttribute("src", tab[i][2]);
        img.setAttribute("width", "150");
        img.setAttribute("height", "100");
        img.setAttribute("data-toggle", "modal");
        img.setAttribute("data-target", "#choix");

        newP.innerHTML = tab[i][0];
        newP.id = tab[i][1];
        newP.classList.add("liste-pays", "text-left", "m-0");
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
            div = document.createElement('div');
            div.classList.add("col-lg-3");
            div.setAttribute('id', 'colonne-' + h);
            affiche.appendChild(div);
            idcolonne = 'colonne-' + h;
        }
        theColonne = document.querySelector('#' + idcolonne);
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

function langues(iso) {
    fetch('/langues')

        .then((res) => {
            return res.json();

        })
        .then((res) => {

            for (i = 0; i < res.length; i++) {
                if (res[i]["Alpha3b_Code"] === iso) {
                    document.getElementById("valueLangue").innerText = res[i]["French_Name"];
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

