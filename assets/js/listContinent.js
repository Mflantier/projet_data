
// Affichage liste de tous les pays par continents
const pays = document.querySelector('#pays');

fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        for (i = 0; i < 250; i++) {
            // Europe
            if(res[i]['region'] == 'Europe'){
                let li = document.createElement("li");
                li.innerHTML = res[i]['translations']['fr'];
                li.classList.add("liste-pays");
                li.id = res[i]['alpha3Code'].toLowerCase();
                pays.appendChild(li);
            } else 
            // Asie
            if(res[i]['region'] == 'Asia'){
                let li = document.createElement("li");
                li.innerHTML = res[i]['translations']['fr'];
                li.classList.add("liste-pays");
                li.id = res[i]['alpha3Code'].toLowerCase();
                pays.appendChild(li);
            } else 
            // Amérique
            if(res[i]['region'] == 'Americas'){
                let li = document.createElement("li");
                li.innerHTML = res[i]['translations']['fr'];
                li.classList.add("liste-pays");
                li.id = res[i]['alpha3Code'].toLowerCase();
                pays.appendChild(li);
            } else 
            // Afrique
            if(res[i]['region'] == 'Africa'){
                let li = document.createElement("li");
                li.innerHTML = res[i]['translations']['fr'];
                li.classList.add("liste-pays");
                li.id = res[i]['alpha3Code'].toLowerCase();
                pays.appendChild(li);
            } else 
            // Océanie
            if(res[i]['region'] == 'Oceania'){
                let li = document.createElement("li");
                li.innerHTML = res[i]['translations']['fr'];
                li.classList.add("liste-pays");
                li.id = res[i]['alpha3Code'].toLowerCase();
                pays.appendChild(li);
            }
        };
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })