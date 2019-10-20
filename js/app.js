var card = document.getElementById("cardbox");
var searchVal;
var first = "";

function func() {
  searchVal = document.getElementById('search').value;
  console.log(searchVal);
  fetchit(searchVal)
}
function fetchit(value) {
  // var url = `https://api.themoviedb.org/3/discover/movie?api_key=9ca321e0477eb3e89ec7f2b59812c219&language=en-US&sort_by=release_date.dasc&include_adult=false&include_video=false&page=1`;
  var url = `https://api.themoviedb.org/3/search/movie?api_key=9ca321e0477eb3e89ec7f2b59812c219&language=en-US&query=${searchVal}`;
  fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      first = data.results;
      createCard(first);
    });
}
function createCard(first) {
  // console.log(data);
  card.innerHTML = "";
  first.forEach(element => {
    var summary = element.overview;
    summary = summary.substr(0, 300);
    var cardData = `
                    <div class="card">
                    <div class="face face1">
                      <div class="content">
                        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" id="iimg" alt="">
                      </div>
                    </div>
                    <div class="face face2">
                      <div class="content">
                        <p>
                        ${summary}
                        </p>
                        <button id="${element.id}"  class="searchbtn" onclick="getButtonID(this.id)">Get details</button>
                      </div>
                    </div>
                  </div>`;
    card.innerHTML += cardData;
    //     var value1=element.id;
    // var queryString = "?para1=" + value1;
    // window.location.href = "details.html" + queryString;

  });

}
// function getButtonID(id){
//   var value1=element.id;
//   var queryString = "?para1=" + value1;
//   window.location.href = "details.html" + queryString;
// }
function scheduleByName(sortterm) {
  // console.log(first);
  var byName = first.slice(0);
  byName.sort(function (a, b) {
    var x = a.title.toLowerCase();
    var y = b.title.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  // console.log('by name:');
  // console.log(byName);
  createCard(byName);
}
// to send data to next page
// var value1=element.id;
// var queryString = "?para1=" + value1;
// window.location.href = "details.html" + queryString;

// put this in next page script to recover data
// var queryString = decodeURIComponent(window.location.search);
// queryString = queryString.substring(1);
// var queries = queryString.split("&");
// for (var i = 0; i < queries.length; i++)
// {
//   document.write(queries[i] + "<br>");
// }
