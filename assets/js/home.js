var map = document.querySelector('#map');
var paths = map.querySelectorAll('.map__image a');
var links = map.querySelectorAll('.map__list a');


if(NodeList.prototype.forEach === undefined){

    NodeList.prototype.forEach = function (callback){

        [].forEach.call(this, callback)
    }
}

paths.forEach(function(path){

    path.addEventListener('mouseenter', function (e){

           var id = this.id.replace('FR-', '');
           document.querySelector('#list-' + id).classList.add('is-active');
           document.querySelector('#region-' + id).classList.add('is-active');

    })

})

const monmenu = document.querySelector(".showmenu");
const monhamberger = document.querySelector(".hamburger");
const close = document.querySelector(".closeBtn");
const btnContinent = document.querySelector(".btn-continent");
const sousMenuContinents = document.querySelector(".sous-menu-continents");


// const closemenuprojets = document.querySelector(".projets");
// const closemenuapropos = document.querySelector(".apropos");
// const closemenucontact = document.querySelector(".contact");

monhamberger.addEventListener("click", function(showmenu){
       document.querySelector(".showmenu").style.left = "0vw";
       document.querySelector(".hamburger").style.visibility = "hidden";
 })
//  close.addEventListener("click", function(hidemenu){
//         document.querySelector(".showmenu").style.left = "-50vw";
//         document.querySelector(".hamburger").style.display = "block";
//  })
 monmenu.addEventListener("click", function(hidemenu){
    document.querySelector(".showmenu").style.left = "-50vw";
    document.querySelector(".hamburger").style.visibility = "visible";
})

btnContinent.addEventListener("click", function(showmenu){
    document.querySelector(".sous-menu-continents").style.visibility = "visible";
    document.querySelector(".btnContinent").style.background = "#fff";
})

// menupays.addEventListener("click", function(hidemenu){

//     document.querySelector(".menu-pays").style.right = "-50vw";
//     document.querySelector(".fa-caret-down").style.color = "#005904";
    
// })


// btnPays.addEventListener("click", function(hidemenu){
//     document.querySelector(".menu-pays").style.right = "-50vw";
//     document.querySelector(".fa-caret-down").style.color = "#005904";
// })


requestURL = "https://restcountries.eu/rest/v2/alpha/col" ; 

fetch(requestURL)
    .then((response)=>{
            return response.json();
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });

    // collapse menu

