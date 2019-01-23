// Affichage des drapeaux

const flag = document.querySelector('#flag');

function leFetch() {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {

            for (i = 0; i < 250; i++) {
                let ul = document.createElement("ul");
                let img = document.createElement("img");
                let bouton = document.createElement("button");
                let text = document.createElement("text");

                img.setAttribute("src", res[i]['flag']);
                img.setAttribute("data-toggle", "modal");
                img.setAttribute("data-target", "#choix");
                img.setAttribute("width", "150");
                img.setAttribute("height", "100");
                img.setAttribute("id", res[i]['alpha3Code']);
                img.classList.add("imagelb");

                text.innerHTML = res[i]['translations']['fr'] + "<br/>";
                text.classList.add("textimg");

                bouton.textContent = 'En savoir plus';
                bouton.setAttribute("data-toggle", "modal");
                bouton.setAttribute("data-target", "#choix");
                bouton.setAttribute("value", "value_input");
                bouton.setAttribute("type", "button");
                bouton.classList.add("bouton");
                bouton.id = res[i]['alpha3Code'];
                ul.classList.add("liste-flag");

                ul.appendChild(img);
                ul.appendChild(text);

                ul.appendChild(bouton);
                flag.appendChild(ul);

            };
            addEventImage();
            addEventButton();
           
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            };
        });


}




// Bouton en savoir plus

function addEventButton() {
    const boutons = document.querySelectorAll('.bouton');
    for (i = 0; i < boutons.length; i++) {
        boutons[i].addEventListener('click', function (e) {
            let aCode = e.target.id;
            loadInfo(aCode);
        });
    }

}

function loadInfo(aCode) {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const fenetre = document.querySelector('#choix');


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
            console.log(response);
            drapeau.innerHTML = '<img src="' + response['flag'] + '" width="150" height="100">';
            continent.innerHTML = '<strong>Continent : </strong>' + response['region'];
            capitale.innerHTML = '<strong>Capitale : </strong>' + response['capital'];
            population.innerHTML = '<strong>Population : </strong>' + response['population'];
            superficie.innerHTML = '<strong>Superficie : </strong>' + response['area'] +' '+ 'km2';
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


}

// Images

function addEventImage() {
    const imgs = document.querySelectorAll('.imagelb');
    for (i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', function (e) {
            let aCode = e.target.id;
            loadImage(aCode);
        });
    }

}

function loadImage(aCode) {
   
    const name = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    const fenetre = document.querySelector('#choix');

    fetch(`https://restcountries.eu/rest/v2/alpha/` + aCode)
    
        .then((response) => {
            return response.json();
            
        }) 
        .then((response) => {
                while (choice.firstChild) {
                    choice.removeChild(choice.firstChild);
                   
                }
                
                let drapeau = document.createElement("p");
               
                name.textContent = response['translations']['fr'];

                drapeau.innerHTML = '<img src="' + response['flag'] + '" width="100%" height="75%">';
           
            choice.appendChild(drapeau);

        })
.catch((err) => {
    if (err) {
        console.log(err);
    };
})


}


leFetch();