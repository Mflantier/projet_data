
// Affichage liste de toutes les capitales
const pays = document.querySelector('#pays');

fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        for (i = 0; i < 250; i++) {
            let li = document.createElement("li");
            li.innerHTML = res[i]['capital'];
            li.classList.add("liste-capitale");
            li.id = res[i]['alpha3Code'].toLowerCase();
            pays.appendChild(li);
        };
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })