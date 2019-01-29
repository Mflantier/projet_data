const monMenu = document.querySelector(".showmenu");
const monHamburger = document.querySelector(".hamburger");
const btnMenu = document.querySelectorAll(".btn-menu");
const close = document.querySelector(".closeBtn");
const btnContinent = document.querySelector(".btn-continent");
const sousMenuContinents = document.querySelector(".sous-menu-continents");
const appli = document.querySelector(".section-appli");
const closeOrientation = document.querySelector(".close-paysage");
const showMap = document.querySelector(".show-map");


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

//change hambuger menu color on red when i'm on section-appli
var fullScreen = $(window).height();  
$(document).ready(function(){
   $(window).scroll(function(){
      var scroll = $(window).scrollTop();
      if (scroll > fullScreen) {
        $(".btn-menu").css("backgroundColor" , "#a70000fa");
      }
      else{
         $(".btn-menu").css("backgroundColor" , "white");  	
      }
   })
 })

 window.onresize = function(event) {
   $(window).scroll(function(){
      var scroll = $(window).scrollTop();
      if (scroll > fullScreen) {
        $(".btn-menu").css("backgroundColor" , "#a70000fa");
      }
      else{
         $(".btn-menu").css("backgroundColor" , "white");  	
      }
   })
};
 