/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
require('../scss/app.scss');
// require('./flags.js');
require('./menu.js');
require('./infoPays.js');


// transition sur la redirection de mon liens d'ancrage

(function() {
    var speed = 600;
    var moving_frequency = 15; // Affects performance !
    var links = document.querySelectorAll("a"); // Active links
    var href;
    for(var i=0; i<links.length; i++)
    {   
        href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
        if(href !== null && href.length > 1 && href.substr(0, 1) == '#')
        {
            links[i].onclick = function()
            {
                var element;
                var href = this.attributes.href.nodeValue.toString();
                if(element = document.getElementById(href.substr(1)))
                {
                    var hop_count = speed/moving_frequency
                    var getScrollTopDocumentAtBegin = getScrollTopDocument();
                    var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;
                    
                    for(var j = 1; j <= hop_count; j++)
                    {
                        (function()
                         {
                             var hop_top_position = gap*j;
                             setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*j);
                         })();
                    }
                }
                
                return false;
            };
        }
    }
    
    var getScrollTopElement =  function (e)
    {
        var top = 0;
        
        while (e.offsetParent != undefined && e.offsetParent != null)
        {
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }
        
        return top;
    };
    
    var getScrollTopDocument = function()
    {
        return document.documentElement.scrollTop + document.body.scrollTop;
    };
})();

// lightbox for mobile device orientation portrait 
const closeOrientation = document.querySelector(".close-paysage");
const showMap = document.querySelectorAll(".show-map");
for (i = 0; i < 2; i++) {
    showMap[i].addEventListener("click", function(showTheMap){
        if(window.innerHeight > window.innerWidth && window.innerWidth <= 767){
            // alert("Please use Landscape!");
            document.querySelector(".change-orientation").style.top =  "20vh";
            closeOrientation.addEventListener("click", function(close){
                document.querySelector(".change-orientation").style.top = "-100vw";
        })
        }
    })
}

// require('./list.js');
// require('./listCapitale.js');

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

const btnInfo = document.querySelector(".btn-infos");
const showInfo = document.querySelector(".show-info");


$(document).ready(function(){
    document.querySelector(".t-info").classList.replace("t-info", "show-info");
    setTimeout(function(){
       document.querySelector(".show-info").classList.replace("show-info","t-info");
    }, 6000)
   
 })
 
 btnInfo.addEventListener("click", function(showinfo){
    document.querySelector(".t-info").classList.replace("t-info", "show-info");
    setTimeout(function(){
       document.querySelector(".show-info").classList.replace("show-info","t-info");
 
    }, 5000)
 
    console.log("infoooos");
 })