// Affichage liste du pays selectionné
const choice = document.querySelector('.modal-body');
const fenetre = document.querySelector('#choix');
// console.log(fenetre.attributes);
window.addEventListener('click', function (e) {
    if(fenetre.hasAttribute('aria-hidden')){
        let aCode = e.target.id;

        fetch(`https://restcountries.eu/rest/v2/alpha/` + aCode)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                while (choice.firstChild) {
                    choice.removeChild(choice.firstChild);
                }
                let nom = document.querySelector('.modal-title');
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
                
                for(i=0; i < response['borders'].length; i++){
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
        }
})