// Affichage liste du pays selectionné
let newAPI = [];
let tableau = [];
document.addEventListener('DOMContentLoaded', function () {
fetch(`https://restcountries.eu/rest/v2/all`)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        for (i = 0; i < response.length; i++) {
            if (response[i]['alpha3Code'].toLowerCase() === "kos") {
                tableau.push('Kosovo', response[i]['alpha2Code'].toUpperCase(), response[i]['flag'], response[i]['region'], response[i]['capital'], response[i]['population'], response[i]['area'], response[i]['languages'][0]['nativeName'], response[i]['currencies'][0]['name'], response[i]['borders']);
            } else {
                tableau.push(response[i]['translations']['fr'], response[i]['alpha2Code'].toUpperCase(), response[i]['flag'], response[i]['region'], response[i]['capital'], response[i]['population'], response[i]['area'], response[i]['languages'][0]['nativeName'], response[i]['currencies'][0]['name'], response[i]['borders']);
            }
            newAPI.push(tableau);
            tableau = [];
        };
        affichageLightBox(newAPI)
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })
})

function affichageLightBox(tab) {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const node = document.querySelectorAll('.land');
    for (let i = 0; i < node.length; i++) {
        node[i].addEventListener('click', function (e) {
            let aCode = e.target.id;
            let region;
            for (let p = 0; p < tab.length; p++) {
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
                    voisins.classList.add("p-0");


                    nom.textContent = tab[p][0];
                    drapeau.setAttribute("src", tab[p][2]);
                    drapeau.setAttribute("width", "150");
                    drapeau.setAttribute("heigth", "100");
                    continent.innerHTML = '<strong>Continent : </strong>' + region;
                    capitale.innerHTML = '<strong>Capitale : </strong>' + tab[p][4];
                    population.innerHTML = '<strong>Population : </strong>' + tab[p][5];
                    superficie.innerHTML = '<strong>Superficie : </strong>' + tab[p][6] + ' Km<sup>2</sup>';
                    langue.innerHTML = '<strong>Langue : </strong>' + tab[p][7];
                    devise.innerHTML = '<strong>Devise : </strong>' + tab[p][8];
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