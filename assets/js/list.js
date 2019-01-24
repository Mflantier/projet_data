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
                newAPI.push(tableau;
                tableau = [];
            };
            console.log(newAPI.push());
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

// Affichage liste du pays selectionné
function affichage(tab) {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const node = document.querySelectorAll('.liste-pays');
    for (i = 0; i < node.length; i++) {
        node[i].addEventListener('click', function (e) {
            let aCode = e.target.id;

            if (aCode == tab[i][1]) {
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

                nom.textContent = tab[0];
                drapeau.innerHTML = '<img src="' + tab[2] + '" width="150" height="100">';
                continent.innerHTML = 'Continent : ' + tab[3];
                capitale.innerHTML = 'Capitale : ' + tab[4];
                population.innerHTML = 'Population : ' + tab[5];
                superficie.innerHTML = 'Superficie : ' + tab[6];
                langue.innerHTML = 'Langue : ' + tab[7];
                devise.innerHTML = 'Devise : ' + tab[8];
                voisins.innerHTML = 'Pays voisins : ';

                for (i = 0; i < tab[9].length; i++) {
                    fetch(`https://restcountries.eu/rest/v2/alpha/` + tab[9][i])
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
            }
        })
    }
}
leFetch(affichage);

// Tri ordre alphabétique en français
function afficheListe(tab) {
    tab.sort();
    let li = document.createElement("p");
    li.innerHTML = tab[0];
    li.classList.add("liste-pays", "text-center");
    li.setAttribute('data-toggle', 'modal');
    li.setAttribute('data-target', '#choix');
    li.id = tab[1];
    pays.appendChild(li);
}