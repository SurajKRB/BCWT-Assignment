'use strict';
console.log('Hello World');

const figCaptionElement = document.querySelector('figcaption');
const imageElement = document.querySelector('img');


const getData = async() =>{
    const response = await fetch('pics.json');
    console.log(response);
    const data = await response.json();
    console.log(data);
    figCaptionElement.innerText = data[0].name;
    imageElement.src = data[0].url;
    imageElement.alt = data[0].description;
};

getData();


console.log("this is the last line of the code");