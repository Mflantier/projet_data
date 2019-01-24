// Affichage liste de toutes les capitales
const pays = document.querySelector('#pays');
let tableau = [];

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {

            for (i = 0; i < 250; i++) {
                tableau.push(res[i]['translations']['fr'] + "#" + res[i]['alpha3Code'].toLowerCase());
            };
            afficheListe(tableau);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });
    setTimeout(function () {
        callBack();
    }, 1000);

}

function affichageLightBox() {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const node = document.querySelectorAll('.liste-capitale');
    for (i = 0; i < node.length; i++) {
        node[i].addEventListener('click', function (e) {
            let aCode = e.target.id;

            fetch(`https://restcountries.eu/rest/v2/alpha/` + aCode)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
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

                    nom.textContent = response['translations']['fr'];
                    drapeau.innerHTML = '<img src="' + response['flag'] + '" width="150" height="100">';
                    continent.innerHTML = '<strong>Continent : </strong>' + response['region'];
                    capitale.innerHTML = '<strong>Capitale : </strong>' + response['capital'];
                    population.innerHTML = '<strong>Population : </strong>' + response['population'];
                    superficie.innerHTML = '<strong>Superficie : </strong>' + response['area'] +' '+ 'km<sup>2</sup>';
                    langue.innerHTML = '<strong>Langue : </strong>' + response['languages'][0]['nativeName'];
                    devise.innerHTML = '<strong>Devise : </strong>' + response['currencies'][0]['name'];
                    voisins.innerHTML = '<strong>Pays voisins : </strong>';

                    for (i = 0; i < response['borders'].length; i++) {
                        fetch(`https://restcountries.eu/rest/v2/alpha/` + response['borders'][i])
                            .then((response) => {
                                return response.json();
                            })
                            .then((response) => {
                                let voisin = document.createElement("li");
                                voisin.innerHTML = response['translations']['fr'];
                                voisins.appendChild(voisin);
                            })
                    }
                    choice.appendChild(drapeau);
                    choice.appendChild(continent);
                    choice.appendChild(capitale);
                    choice.appendChild(population);
                    choice.appendChild(superficie);
                    choice.appendChild(langue);
                    choice.appendChild(devise);
                    choice.appendChild(voisins);
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    };
                })
        })
    }
}

leFetch(affichageLightBox);

// Tri ordre alphabétique en français
function afficheListe(tab) {
    tab.sort(Intl.Collator().compare);
    z = 0;
    h = 0;
    for (t = 0; t < tab.length; t++) {
        let nomId = tab[t].split("#");
        fetch(`https://restcountries.eu/rest/v2/alpha/` + nomId[1])
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                let capitale = res['capital'];
                let newP = document.createElement("p");
                newP.innerHTML = nomId[0] + " - " + capitale;
                newP.classList.add("liste-capitale", "text-left");
                newP.setAttribute('data-toggle', 'modal');
                newP.setAttribute('data-target', '#choix');
                newP.id = nomId[1];
                
        if (z === 0) {
            div = document.createElement('div');
            div.classList.add("col-lg-3");
            div.setAttribute('id', 'colonne-' + h);
            pays.appendChild(div);
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
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                };
            });
    }
}