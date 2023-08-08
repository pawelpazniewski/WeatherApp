const cities = [
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Beijing",
  "Moscow",
  "Cairo",
  "Madrid",
  "Rome",
  "Athens",
  "Stockholm",
  "Lisbon",
  "Bangkok",
  "Sydney",
  "Toronto",
  "Berlin",
  "Amsterdam",
  "Brussels",
  "Dubai",
  "Seoul",
  "Hanoi",
  "Oslo",
  "Copenhagen",
  "Havana",
  "Rio de Janeiro",
  "Delhi",
  "Mexico City",
  "Lima",
  "Sao Paulo",
  "Dakar",
  "Cape Town",
  "Dublin",
  "Beirut",
  "Karachi",
  "Istanbul",
  "Cairo",
  "Kolkata",
  "Bangalore",
  "Nairobi",
  "Melbourne",
  "Vancouver",
  "Singapore",
  "Kuala Lumpur",
  "Dubai",
  "Cairo",
  "Abu Dhabi",
  "Mumbai",
  "Riyadh",
  "Dublin",
  "Budapest",
  "Helsinki",
  "Hamburg",
  "Lyon",
  "Milan",
  "Warsaw",
  "Zurich",
  "Toronto",
  "Montreal",
  "Barcelona",
  "Lisbon",
  "Rome",
  "Moscow",
  "Osaka",
  "Kiev",
  "Bogota",
  "Cape Town",
  "Istanbul",
  "Buenos Aires",
  "Delhi",
  "Sydney",
  "Melbourne",
  "Bangkok",
  "Manila",
  "Mumbai",
  "Shanghai",
  "Tokyo",
  "São Paulo",
  "Hamburg",
  "Manchester",
  "Lyon",
  "Birmingham",
  "Vienna",
  "Zagreb",
  "Prague",
  "Brisbane",
  "Adelaide",
  "Wellington",
  "Auckland",
  "Johannesburg",
  "Cape Town",
  "Berlin",
  "Hamburg",
  "Munich",
  "Frankfurt",
  "Cologne",
  "Lisbon",
  "Porto",
  "Barcelona",
  "Madrid",
  "Valencia",
];

console.log(cities); // Wypisanie tablicy miast w konsoli



const contentBox = document.querySelector('.content-box');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
let weatherStatus = document.querySelector('.weather-status');
let currentCity = document.querySelector('.current-city');
let currentTemp = document.querySelector('.temp');
let todayTemp = document.querySelector('.today-temp');
let tomTemp = document.querySelector('.tom-temp');
let nextTemp = document.querySelector('.next-temp');
let todImg = document.querySelector('.weather-img-tod');
let tomImg = document.querySelector('.weather-img-tom');
let nextImg = document.querySelector('.weather-img-next');



const citySearchUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const searchByIdUrl = 'https://api.openweathermap.org/data/2.5/forecast?id='
const apiKey = '&appid=66d50409d4f0bf91687f8292ee4d24ef';
const units = '&units=metric';
const iconURL = 'https://openweathermap.org/img/wn/';

let inputValue = '';
let cityData = null; 
const min = 0;
const max = 100;


const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;





function updateFields(respData) {

  if(respData.list[0].weather[0].main === 'Clouds'){
    weatherStatus.innerHTML = '<div><i class="bx bx-cloud"></i> Clouds</div>';
    contentBox.style.backgroundImage = 'url(https://images.pexels.com/photos/4870972/pexels-photo-4870972.jpeg)';
    }else if (respData.list[0].weather[0].main === 'Clear'){
      weatherStatus.innerHTML = '<div><i class="bx bx-sun"></i> Clear</div>';
      contentBox.style.backgroundImage = 'url(https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    }
    else if (respData.list[0].weather[0].main === 'Atmosphere'){
      weatherStatus.innerHTML = '<div><i class="bx bx-water"></i> Mist</div>';
      contentBox.style.backgroundImage = 'url(https://images.pexels.com/photos/1743392/pexels-photo-1743392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    }
    else if (respData.list[0].weather[0].main === 'Snow'){
      weatherStatus.innerHTML = '<div><i class="bx bx-cloud-snow"></i> Snow</div>';
      contentBox.style.backgroundImage = 'url(https://images.pexels.com/photos/1032654/pexels-photo-1032654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
      contentBox.style.color = 'black';
    }
    else if (respData.list[0].weather[0].main === 'Rain' || 'Drizzle'){
      weatherStatus.innerHTML = '<div><i class="bx bx-cloud-rain"></i> Rain</div>';
      contentBox.style.backgroundImage = 'url(https://images.pexels.com/photos/1906932/pexels-photo-1906932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    }
    else if (respData.list[0].weather[0].main === 'Thunderstorm'){
      weatherStatus.innerHTML = '<div><i class="bx bx-cloud-lightning"></i> Thunderstorm</div>';
      contentBox.style.backgroundImage = 'url(https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    }

  let weatherImgTod = respData.list[0].weather[0].icon;
  let weatherImgTom = respData.list[1].weather[0].icon;
  let weatherImgNext = respData.list[2].weather[0].icon;


  currentCity.innerText = respData.city.name;
  currentTemp.innerText = Math.floor(respData.list[0].main.temp);
  todayTemp.innerText = Math.floor(respData.list[0].main.temp);
  tomTemp.innerText = Math.floor(respData.list[1].main.temp);
  nextTemp.innerText = Math.floor(respData.list[2].main.temp);
  todImg.innerHTML = `<img src="${iconURL}${weatherImgTod}.png">`;
  tomImg.innerHTML = `<img src="${iconURL}${weatherImgTom}.png">`;
  nextImg.innerHTML = `<img src="${iconURL}${weatherImgNext}.png">`;

  

}

function citySearch(userInput) {
  fetch(citySearchUrl + userInput + apiKey+ units)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Zapisanie danych do zmiennej cityData
      cityData = data;
      updateFields(cityData);

      // Tutaj możesz dalej przetwarzać cityData lub wykorzystać do innych celów
      console.log(cityData); // Wyświetlenie danych w konsoli (opcjonalnie)
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

    console.log(citySearchUrl + userInput + apiKey);

    
}

searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    inputValue = searchInput.value;
    citySearch(inputValue);
  }
});

searchButton.addEventListener('click', () => {
  inputValue = searchInput.value;
  citySearch(inputValue);
});

citySearch(cities[randomNumber]);



