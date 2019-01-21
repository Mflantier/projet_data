// Affichage liste de tous les pays
const pays = document.querySelector('#pays');

fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        for (i = 0; i < 250; i++) {
            let li = document.createElement("li");
            li.innerHTML = res[i]['translations']['fr'];
            li.classList.add("liste-pays");
            li.id = res[i]['alpha3Code'].toLowerCase();
            pays.appendChild(li);
        };
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })