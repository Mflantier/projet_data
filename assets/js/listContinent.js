// Affichage liste de tous les pays par continents
const affiche = document.querySelector('#selectContinent');
const submenu = document.querySelectorAll(".continent");
let url = window.location['pathname'];

function leFetch(callBack) {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            for (i = 0; i < 250; i++) {
                if (url == '/continent/europe') {
                    // Europe
                    if (res[i]['region'] == 'Europe') {
                        let li = document.createElement("li");
                        li.innerHTML = res[i]['translations']['fr'];
                        li.classList.add("liste-pays");
                        li.setAttribute('data-toggle', 'modal');
                        li.setAttribute('data-target', '#choix');
                        li.id = res[i]['alpha3Code'].toLowerCase();
                        affiche.appendChild(li);
                    }
                } else if (url == '/continent/asie') {
                    // Asie
                    if (res[i]['region'] == 'Asia') {
                        let li = document.createElement("li");
                        li.innerHTML = res[i]['translations']['fr'];
                        li.classList.add("liste-pays");
                        li.setAttribute('data-toggle', 'modal');
                        li.setAttribute('data-target', '#choix');
                        li.id = res[i]['alpha3Code'].toLowerCase();
                        affiche.appendChild(li);
                    }
                } else if (url == '/continent/amerique') {
                    // Amérique
                    if (res[i]['region'] == 'Americas') {
                        let li = document.createElement("li");
                        li.innerHTML = res[i]['translations']['fr'];
                        li.classList.add("liste-pays");
                        li.setAttribute('data-toggle', 'modal');
                        li.setAttribute('data-target', '#choix');
                        li.id = res[i]['alpha3Code'].toLowerCase();
                        affiche.appendChild(li);
                    }
                } else if (url == '/continent/afrique') {
                    // Afrique
                    if (res[i]['region'] == 'Africa') {
                        let li = document.createElement("li");
                        li.innerHTML = res[i]['translations']['fr'];
                        li.classList.add("liste-pays");
                        li.setAttribute('data-toggle', 'modal');
                        li.setAttribute('data-target', '#choix');
                        li.id = res[i]['alpha3Code'].toLowerCase();
                        affiche.appendChild(li);
                    }
                } else if (url == '/continent/oceanie') {
                    // Océanie
                    if (res[i]['region'] == 'Oceania') {
                        let li = document.createElement("li");
                        li.innerHTML = res[i]['translations']['fr'];
                        li.classList.add("liste-pays");
                        li.setAttribute('data-toggle', 'modal');
                        li.setAttribute('data-target', '#choix');
                        li.id = res[i]['alpha3Code'].toLowerCase();
                        affiche.appendChild(li);
                    }
                } else if (url == '/continent/tous') {
                    let li = document.createElement("li");
                    li.innerHTML = res[i]['translations']['fr'];
                    li.classList.add("liste-pays");
                    li.setAttribute('data-toggle', 'modal');
                    li.setAttribute('data-target', '#choix');
                    li.id = res[i]['alpha3Code'].toLowerCase();
                    affiche.appendChild(li);
                } else {
                    affiche.innerHTML("Un problème est survenu lors du chargement des données");
                }
            };
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        })
    setTimeout(function () {
        callBack();
    }, 1000);

}

function affichage() {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const node = document.querySelectorAll('.liste-pays');
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
                    continent.innerHTML = 'Continent : ' + response['region'];
                    capitale.innerHTML = 'Capitale : ' + response['capital'];
                    population.innerHTML = 'Population : ' + response['population'];
                    superficie.innerHTML = 'Superficie : ' + response['area'];
                    langue.innerHTML = 'Langue : ' + response['languages'][0]['nativeName'];
                    devise.innerHTML = 'Devise : ' + response['currencies'][0]['name'];
                    voisins.innerHTML = 'Pays voisins : ';

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

leFetch(affichage);