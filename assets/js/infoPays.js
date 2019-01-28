import affichageLightBox from './infoLightBox';

// Affichage liste du pays selectionné
let newAPI = [];
let tableau = [];
document.addEventListener('DOMContentLoaded', function () {
fetch(`https://restcountries.eu/rest/v2/all`)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        for (i = 0; i < response.length; i++) {
            if (response[i]['alpha3Code'].toLowerCase() === "kos") {
                tableau.push('Kosovo', response[i]['alpha2Code'].toUpperCase(), response[i]['flag'], response[i]['region'], response[i]['capital'], response[i]['population'], response[i]['area'], response[i]['languages'][0]['nativeName'], response[i]['currencies'][0]['name'], response[i]['borders']);
            } else {
                tableau.push(response[i]['translations']['fr'], response[i]['alpha2Code'].toUpperCase(), response[i]['flag'], response[i]['region'], response[i]['capital'], response[i]['population'], response[i]['area'], response[i]['languages'][0]['nativeName'], response[i]['currencies'][0]['name'], response[i]['borders']);
            }
            newAPI.push(tableau);
            tableau = [];
        };
        affichageLightBox(newAPI)
    })
    .catch((err) => {
        if (err) {
            console.log(err);
        };
    })
})