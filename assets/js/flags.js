/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
// require('../scss/flags.scss');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');


const flag = document.querySelector('#flag');

fetch(`https://restcountries.eu/rest/v2/all`)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res);

        for (i = 0; i < 250; i++) {
            let ul = document.createElement("ul");
            ul.innerHTML = '<img class="lb" src="' + res[i]['flag'] + '" width="100" height="75">' +"<br>"+ res[i]['translations']['fr'] +"<br>"+ '<button>En savoir plus</button>';
            ul.classList.add("liste-flag");
            flag.appendChild(ul);
        };
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })

// {
//     "name": "France",
//     "topLevelDomain": [".fr"],
//     "alpha2Code": "FR",
//     "alpha3Code": "FRA",
//     "callingCodes": ["33"],
//     "capital": "Paris",
//     "altSpellings": ["FR", "French Republic", "République française"],
//     "region": "Europe",
//     "subregion": "Western Europe",
//     "population": 66710000,
//     "latlng": [46.0, 2.0],
//     "demonym": "French",
//     "area": 640679.0,
//     "gini": 32.7,
//     "timezones": ["UTC-10:00", "UTC-09:30", "UTC-09:00", "UTC-08:00", "UTC-04:00", "UTC-03:00", "UTC+01:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+11:00", "UTC+12:00"],
//     "borders": ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"],
//     "nativeName": "France",
//     "numericCode": "250",
//     "currencies": [{
//         "code": "EUR",
//         "name": "Euro",
//         "symbol": "€"
//     }],
//     "languages": [{
//         "iso639_1": "fr",
//         "iso639_2": "fra",
//         "name": "French",
//         "nativeName": "français"
//     }],
//     "translations": {
//         "de": "Frankreich",
//         "es": "Francia",
//         "fr": "France",
//         "ja": "フランス",
//         "it": "Francia",
//         "br": "França",
//         "pt": "França",
//         "nl": "Frankrijk",
//         "hr": "Francuska",
//         "fa": "فرانسه"
//     },
//     "flag": "https://restcountries.eu/data/fra.svg",
//     "regionalBlocs": [{
//         "acronym": "EU",
//         "name": "European Union",
//         "otherAcronyms": [],
//         "otherNames": []
//     }],
//     "cioc": "FRA"
// }