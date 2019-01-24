// Affichage liste du pays selectionné
document.addEventListener('DOMContentLoaded', function () {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const fenetre = document.querySelector('.modal-dialog');
    const node = document.querySelectorAll('.land');
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
})