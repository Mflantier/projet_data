// Affiche le pays selectionné

export default function affichageLightBox(tab) {
    const nom = document.querySelector('.modal-title');
    const choice = document.querySelector('.modal-body');
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains("liste-pays") || e.target.classList.contains("bouton") || e.target.classList.contains("land")) {
            let aCode = e.target.id;

            for (let p = 0; p < tab.length; p++) {
                let region = tab[p][3];
                if (aCode == tab[p][1]) {
                    
                    devises(tab[p][8]);
                    langues(tab[p][10]);
                    while (choice.firstChild) {
                        choice.removeChild(choice.firstChild);
                    }
                    if (tab[p][3] == "Europe") {
                        region = "Europe";
                    } else if (tab[p][3] == "Americas") {
                        region = "Amérique";
                    } else if (tab[p][3] == "Asia") {
                        region = "Asie";
                    } else if (tab[p][3] == "Africa") {
                        region = "Afrique";
                    } else if (tab[p][3] == "Oceania") {
                        region = "Océanie";
                    }
                    let drapeau = document.createElement("img");
                    let continent = document.createElement("p");
                    let capitale = document.createElement("p");
                    let population = document.createElement("p");
                    let superficie = document.createElement("p");
                    let langue = document.createElement("p");
                    let devise = document.createElement("p");
                    let voisins = document.createElement("ul");

                    nom.textContent = tab[p][0];
                    drapeau.setAttribute("src", tab[p][2]);
                    drapeau.setAttribute("width", "150");
                    drapeau.setAttribute("height", "100");

                    continent.innerHTML = '<strong>Continent : </strong>' + region;
                    capitale.innerHTML = '<strong>Capitale : </strong>' + tab[p][4];
                    population.innerHTML = '<strong>Population : </strong>' + tab[p][5]+ ' habitants';
                    superficie.innerHTML = '<strong>Superficie : </strong>' + tab[p][6] + ' km<sup>2</sup>';

                    if ("valueLangue" == "") {
                        langue.innerHTML = '<strong>Langue : </strong>' + tab[p][7];
                    } else {
                        langue.innerHTML = '<strong>Langue : </strong><span id="valueLangue"></span> ';
                    }
                    devise.innerHTML = '<strong>Devise : </strong><span id="valueDevise"></span> ';
                    voisins.innerHTML = '<strong>Pays voisins : </strong>';

                    if (tab[p][9].length === 0) {
                        voisins.innerHTML = '<strong>Pays voisins : </strong> Aucun';
                    } else {
                        for (let n = 0; n < tab[p][9].length; n++) {
                            fetch(`https://restcountries.eu/rest/v2/alpha/` + tab[p][9][n])
                                .then((response) => {
                                    return response.json();
                                })
                                .then((response) => {
                                    let voisin = document.createElement("li");
                                    voisin.innerHTML = response['translations']['fr'];
                                    voisins.appendChild(voisin);
                                })
                        }
                    }

                    let topContent = document.createElement("div");
                    let leftContent = document.createElement("div");
                    let rightContent = document.createElement("div");
                    let bottomContent = document.createElement("div");
                    bottomContent.classList.add("row", "w-100");
                    topContent.classList.add("w-100","p-2", "d-flex", "justify-content-center");
                    leftContent.classList.add("col-6");
                    rightContent.classList.add("col-6");

                    topContent.appendChild(drapeau);
                    leftContent.appendChild(capitale);
                    leftContent.appendChild(population);
                    leftContent.appendChild(superficie);
                    leftContent.appendChild(langue);
                    leftContent.appendChild(devise);
                    rightContent.appendChild(continent);
                    rightContent.appendChild(voisins);
                    bottomContent.appendChild(leftContent);
                    bottomContent.appendChild(rightContent);
                    choice.appendChild(topContent);
                    choice.appendChild(bottomContent);

                }
            }
        } else if (e.target.classList.contains("imagelb")) {
            let aCode = e.target.id;
            for (let p = 0; p < tab.length; p++) {
                if (aCode == tab[p][1]) {
                    while (choice.firstChild) {
                        choice.removeChild(choice.firstChild);
                    }
                    let drapeau = document.createElement("img");

                    nom.textContent = tab[p][0];
                    drapeau.setAttribute("src", tab[p][2]);
                    drapeau.setAttribute("width", "80%");
                    drapeau.setAttribute("height", "50%");
                    drapeau.setAttribute("align", "center");
                    choice.appendChild(drapeau);
                }
            }
        }
    })

    function langues(iso) {
        fetch('/langues')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                for (i = 0; i < res.length; i++) {
                    if (res[i]["Alpha3b_Code"] === iso) {
                        document.getElementById("valueLangue").innerText = res[i]["French_Name"].charAt(0).toUpperCase() + res[i]["French_Name"].slice(1);
                    } else if (res[i]["Alpha3t_Code"] === iso) {
                        document.getElementById("valueLangue").innerText = res[i]["French_Name"].charAt(0).toUpperCase() + res[i]["French_Name"].slice(1);
                        return;
                    }
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                };
            });
    }

    function devises(currency) {
        fetch('/devises')
            .then((res) => {
                return res.json();
            })
            .then((res) => {

                for (i = 0; i < res.length; i++) {

                    if (res[i]["ISO_devise"] === currency) {
                        document.getElementById("valueDevise").innerText = res[i]["Devise"].charAt(0).toUpperCase() + res[i]["Devise"].slice(1);
                        return;
                    } else {
                        
                    }
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                };
            });
    }

    function devises(currency) {
        fetch('/devises')
            .then((res) => {
                return res.json();
            })
            .then((res) => {

                    for (i = 0; i < res.length; i++) {

                        if (res[i]["ISO_devise"] === currency) {
                            document.getElementById("valueDevise").innerText = res[i]["Devise"].charAt(0).toUpperCase() + res[i]["Devise"].slice(1);
                            return;
                        }
                    }
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    };
                });
            }
    }
