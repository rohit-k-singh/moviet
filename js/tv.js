var card = document.getElementById("xx");
var searchVal;
var first = "";
var url = `https://api.themoviedb.org/3/discover/tv?api_key=9ca321e0477eb3e89ec7f2b59812c219&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`;
document.getElementById("dataTitle").innerHTML = "Popular Tv Shows";
fetchit(url);
function func() {
  searchVal = document.getElementById('searchterm').value;
  console.log(searchVal);
   url = `   https://api.themoviedb.org/3/search/tv?api_key=9ca321e0477eb3e89ec7f2b59812c219&query=${searchVal}&page=1`;
  fetchit(url)
}
function fetchit(url) {
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      first = data.results;
      createCard(first);
    });
}
function createCard(first) {
  card.innerHTML = "";
  first.forEach(element => {
      var summary = element.overview;
      var url = 'https://image.tmdb.org/t/p/w500'+element.poster_path;
      summary = summary.substr(0, 110);
      var cardData =
        `<div class="containerr" style="background-image:url(${url});">
        <div class="overlay"><div class = "items title">${element.name}</div>
        <div class = "items head"><p>${summary}</p></div>
        <div class = "items price"><p class="new">Rating:${element.vote_average}\/10</p>
        </div><div class="items cart"><i class="fa fa-shopping-cart"></i><div>${element.first_air_date}</div>
        <button class="cardbtn"><a href="details.html?userId=${element.id}">View More</a></button></div>
          </div>
        </div>`;

      card.innerHTML += cardData;
  });
}

function scheduleByName(sortterm) {
  var JSONdata = first.slice(0);
  if(sortterm == "Name"){
    JSONdata.sort(function (a, b) {
      console.log(a,b);
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  else if(sortterm == "Rating"){
            JSONdata.sort(function(a,b) {
                return b.vote_average - a.vote_average;
            });
        }
  else if(sortterm == "Date"){
    JSONdata.sort(function(a, b) {
      a = new Date(a.first_air_date);
      b = new Date(b.first_air_date);
      return a>b ? -1 : a<b ? 1 : 0;
  });
        }
  createCard(JSONdata);
}
