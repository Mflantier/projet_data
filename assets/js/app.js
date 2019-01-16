/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../scss/app.scss');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');


const pays = document.querySelector('#pays');

fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res);

            for (i = 0; i < 250; i++) {
                let li = document.createElement("li");
                li.innerHTML = "<b>Nom : </b>"+res[i]['translations']['fr'];
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