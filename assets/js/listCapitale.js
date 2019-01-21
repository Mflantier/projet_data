// Affichage liste de toutes les capitales
const pays = document.querySelector('#pays');

fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        for (i = 0; i < 250; i++) {
            let p = document.createElement("p");
            p.innerHTML = "<b>Pays : </b>" + res[i]['translations']['fr'] + " <b>Capitale : </b>" + res[i]['capital'];
            p.classList.add("liste-capitale");
            p.classList.add("col-3");
            p.id = res[i]['alpha3Code'].toLowerCase();
            pays.appendChild(p);
        };
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })