
// Affichage liste de tous les pays
const pays = document.querySelector('#pays');

fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        for (i = 0; i < 250; i++) {
            let li = document.createElement("p");
            li.innerHTML = res[i]['translations']['fr'];
            li.classList.add("liste-pays","text-center","col-12","col-sm-6","col-md-3","col-lg-3","col-xl-3");
            li.id = res[i]['alpha3Code'].toLowerCase();
            pays.appendChild(li);
        };
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })