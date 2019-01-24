const monMenu = document.querySelector(".showmenu");
const monHamburger = document.querySelector(".hamburger");
const btnMenu = document.querySelectorAll(".btn-menu");
const close = document.querySelector(".closeBtn");
const btnContinent = document.querySelector(".btn-continent");
const sousMenuContinents = document.querySelector(".sous-menu-continents");
const appli = document.querySelector(".section-appli");


monHamburger.addEventListener("click", function(showmenu){
       document.querySelector(".showmenu").style.left = "0vw";
       document.querySelector(".hamburger").style.visibility = "hidden";
 })
 
monMenu.addEventListener("click", function(event){
     if(event.target.classList.contains("btn-continent")){

     } else {
        document.querySelector(".showmenu").style.left = "-105vw";
        document.querySelector(".hamburger").style.visibility = "visible";
     }
    
})

// btn menu color 
// document.querySelector(".section-appli").onmouseover= function (onmouseoverappli) {
//       document.querySelector(".btn-menu").style.backgroundColor =  "#dc3545";

// }
$(document).ready(function(){
   $(window).scroll(function(){
      var scroll = $(window).scrollTop();
      if (scroll > 879) {
        $(".btn-menu").css("backgroundColor" , "#dc3545");
      }
      else{
         $(".btn-menu").css("backgroundColor" , "white");  	
      }
   })
 })