var card = document.getElementById("content");
var searchVal;
var first = "";
var url = `https://api.themoviedb.org/3/discover/movie?api_key=9ca321e0477eb3e89ec7f2b59812c219&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

document.getElementById("dataTitle").innerHTML = "Popular Movies";
fetchit(url);

function func() {
  searchVal = document.getElementById('searchterm').value;
  console.log(searchVal);
   url = `https://api.themoviedb.org/3/search/movie?api_key=9ca321e0477eb3e89ec7f2b59812c219&query=${searchVal}`;
  fetchit(url);
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
        <div class="overlay"><div class = "items title">${element.title}</div>
        <div class = "items head"><p>${summary}</p></div>
        <div class = "items votes"><p class="new">Rating:${element.vote_average}\/10</p>
        </div><div class="items redate"><div>${element.release_date}</div>
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
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
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
      a = new Date(a.release_date);
      b = new Date(b.release_date);
      return a>b ? -1 : a<b ? 1 : 0;
  });
        }
  createCard(JSONdata);
}
function getDetails(value){
  localStorage["key"] = value;
}
