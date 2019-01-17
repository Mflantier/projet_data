var map = document.querySelector('#map');
var paths = map.querySelectorAll('.map__image a');
var links = map.querySelectorAll('.map__list a');


const monmenu = document.querySelector(".showmenu");
const monhamberger = document.querySelector(".hamburger");
const close = document.querySelector(".closeBtn");
const btnContinent = document.querySelector(".btn-continent");
const sousMenuContinents = document.querySelector(".sous-menu-continents");


monhamberger.addEventListener("click", function(showmenu){
       document.querySelector(".showmenu").style.left = "0vw";
       document.querySelector(".hamburger").style.visibility = "hidden";
 })
//  close.addEventListener("click", function(hidemenu){
//         document.querySelector(".showmenu").style.left = "-50vw";
//         document.querySelector(".hamburger").style.display = "block";
//  })
monmenu.addEventListener("click", function(event){
     if(event.target.classList.contains("btn-continent")){

     } else {
        document.querySelector(".showmenu").style.left = "-50vw";
        document.querySelector(".hamburger").style.visibility = "visible";
     }
     console.log(event.target)
    
})

// btnContinent.addEventListener("click", function(showmenu){
//     document.querySelector(".sous-menu-continents").style.visibility = "visible";
//     document.querySelector(".btnContinent").style.background = "#fff";
// })

