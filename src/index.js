import './css/styles.css';
import _debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box')
let shownCountriesLimit = 10

function handleInput() {
    clearHTML();
    const inputValue = inputRef.value.trim();
    if (inputValue.length > 0) {
        fetchCountries(inputValue).then(data => {
            if (data.length > shownCountriesLimit) {
                return infoMessage('Too many matches found. Please enter a more specific name.')}
            return createHTMLElement(data)
        })
        .catch (error => {
            return errorMessage('Oops, there is no country with that name')}
        )}
}

function createHTMLElement(array) {
    const countryPreviewsList = createCountryPreview(array)
    if (array.length >= 2) {
        clearHTML()
        document.querySelector('.country-list').innerHTML += countryPreviewsList
    } else {
        const countryCard = createCountryCard(array);
    clearHTML()
    document.querySelector('.country-info').insertAdjacentHTML('afterbegin', countryPreviewsList)
    document.querySelector('.country-info').insertAdjacentHTML('beforeend', countryCard)}
}

function createCountryPreview (array) {
    return array.map(item => 
       `<div>
       <img src="${item.flags.svg}" alt="Flag of ${item.name.common}">
       <h2>${item.name.official}</h2> 
       </div>`
   ).join('')
}

function createCountryCard (array) {
   return array.map(item => 
       `<p>Capital: <span>${item.capital}</span></p>
       <p>Population: <span>${item.population}</span></p>
       <p>Languages: <span>${Object.values(item.languages)}</span></p>`
   ).join('')
}

function clearHTML (){
    document.querySelector('.country-list').innerHTML='';
    document.querySelector('.country-info').innerHTML='';
}

function infoMessage (message){
    Notiflix.Notify.info(message)
};

function errorMessage(message){
    Notiflix.Notify.failure(message)
};

inputRef.addEventListener('input',_debounce(handleInput,DEBOUNCE_DELAY))













// function fetchCountriesOld(name) {
//     console.log(name, name.length)
// fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => response.json()).then(data => {
//     const resultsArray = data;
//     if (resultsArray.length > shownLimit) {
//         infoMessage('Too many matches found. Please enter a more specific name.')
//         // alert ('Too many matches found. Please enter a more specific name.')
//     } else {
//         if (resultsArray.length >= 2) {
//             clearHTML();
//             const incomeArray = resultsArray.map (item => 
//                 `<li>
//                 <img src="${item.flags.svg}" alt="">
//                 <h2>${item.name.official}</h2>  
//                 </li>`
//             ).join('');
//             document.querySelector('.country-list').innerHTML+=incomeArray;
//         }
//         else {
//             clearHTML();
//             const countryCard =resultsArray.map (item => 
//                 `<div class="country-info-header">
//                 <img src="${item.flags.svg}" alt="">
//                 <h2>${item.name.official}</h2>
//                 </div>                
//                 <p>Capital: <span>${item.capital}</span></p>
//                 <p>Population: <span>${item.population}</span></p>
//                 <p>Languages: <span>${Object.values(item.languages)}</span></p>
//                `
//             ).join('');            
//             document.querySelector('.country-info').innerHTML = countryCard
//         }
//     }
// })
// .catch (error => 
//     errorMessage('Oops, there is no country with that name')
// )
// }
