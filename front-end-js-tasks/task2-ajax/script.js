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
        h3.innerHTML = data[i].show.name;

        const link = data[i].show.officialSite;
        const offSite = document.createElement('a');
        if(link!=null){
            const text = document.createTextNode("Official Site");
            offSite.appendChild(text);
            offSite.href = link;
        }
        
        const img = document.createElement('img');
        img.src = data[i].show.image.medium;
        
        const summ = document.createElement('p');
        summ.innerHTML = data[i].show.summary;
        
        const genre = document.createElement('p');
        genre.innerText = data[i].show.genres.join(' | ');
        
        result.append(h3, offSite, genre, img, summ);
    }
};


// generic evenet handler example
document.addEventListener('click', (event)=>{
    console.log("Hahaha", event);
});