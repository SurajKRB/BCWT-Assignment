'use strict';
const apiURL = 'https://api.tvmaze.com/search/shows?q='

//get reference to DOM elements

const form = document.querySelector("#search-form");
const button = form.querySelector('button');
const input = form.querySelector('input');
const result = document.querySelector('#results');

button.addEventListener('click',(event)=>{
    // donot submit the form to anywhere (no page refresh)
    event.preventDefault();
    // prevent event to propagate of this event listerner is true
    event.stopPropagation();
    const queryParam = input.value
    if (queryParam.length>1){
        getTVSeriesData(queryParam);
    }
    
});

const getTVSeriesData = async(name)=>{
    try{
        const response = await fetch(apiURL + name);
        const data = await response.json();
        console.log('result data: ', data);
        renderResults(data);
    } catch (error){
        console.log('Network failure: ', error)
    }
};

const renderResults = (data) =>{
    result.innerHTML = '';
    // loop through all search results
    for (let i=0; i<data.length; i++){
        const h3 = document.createElement('h3');
        h3.innerText = data[i].show.name;
        const img = document.createElement('img');
        img.src = data[i].show.image.medium;
        const summ = document.createElement('div');
        summ.innerHTML = data[i].show.summary;
        result.append(h3, img, summ);
    }
};


// generic evenet handler example
document.addEventListener('click', (event)=>{
    console.log("Hahaha", event);
});