var idname ;
var onload = function () {
    var url = document.location.href;
        params = url.split('?')[1];
         tmp = params.split('=');
    idname =  tmp[1];
    createURL(tmp[1]);
}
function createURL(id){
   var url = `https://api.themoviedb.org/3/tv/${id}?api_key=9ca321e0477eb3e89ec7f2b59812c219&language=en-US`;
   console.log(url);
   
   fetchit(url);
}

function fetchit(url) {
    fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        createCard(data);
      });
  }
  function createCard(first){
        console.log(first);
        var imgurl = 'https://image.tmdb.org/t/p/w500'+first.poster_path;
        document.getElementById('im').innerHTML = `<img src="${imgurl}">`;
    }

