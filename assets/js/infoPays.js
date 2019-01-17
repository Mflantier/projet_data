// Affichage liste du pays selectionné
const choice = document.querySelector('#choix');

console.log(choice.style);
    if(choice.classList.contains("")){
        console.log('Passe');
    }
window.addEventListener('click', function (e) {
    let aCode = e.target.id;

    fetch(`https://restcountries.eu/rest/v2/alpha/` + aCode)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            while (choice.firstChild) {
                choice.removeChild(choice.firstChild);
            }
            let nom = document.createElement("li");
            let drapeau = document.createElement("li");
            let continent = document.createElement("li");
            let capitale = document.createElement("li");
            let population = document.createElement("li");
            let superficie = document.createElement("li");
            let langue = document.createElement("li");
            let devise = document.createElement("li");
            let voisins = document.createElement("li");

            nom.innerHTML = response['translations']['fr'];
            drapeau.innerHTML = '<img src="' + response['flag'] + '" width="150" height="100">';
            continent.innerHTML = 'Continent : ' + response['region'];
            capitale.innerHTML = 'Capitale : ' + response['capital'];
            population.innerHTML = 'Population : ' + response['population'];
            superficie.innerHTML = 'Superficie : ' + response['area'];
            langue.innerHTML = 'Langue : ' + response['languages'][0]['nativeName'];
            devise.innerHTML = 'Devise : ' + response['currencies'][0]['name'];
            voisins.innerHTML = 'Pays voisins : ' + response['borders'];

            choice.appendChild(nom);
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