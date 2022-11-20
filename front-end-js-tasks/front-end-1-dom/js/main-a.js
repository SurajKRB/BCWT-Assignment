// Put code of task A here
'use strict'

const main = document.querySelector("main");

const h2 = document.querySelector('h2').textContent;
const src = document.querySelector('img').src;
const alt = document.querySelector('img').alt;
const figCaption = document.querySelector('figcaption').textContent ;

const header = "<header><h2>"+h2+"</h2></header>";
const figure = "<figure><img src="+src+" alt="+alt+"><figurecaption>"+figCaption+"</figcaption></figure>";
const p = "<p>" + document.querySelector('p').textContent + "</p>";


main.innerHTML+= "<article>"+header+figure+p+"</article>";


