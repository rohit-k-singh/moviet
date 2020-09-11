let idname ;
window.onload = function () {
    let url = document.location.href;
        params = url.split('?')[1];
         tmp = params.split('=');
    idname =  tmp[1];
    createURL(tmp[1]);
}
let createURL = (id)=>{
   let url = `https://api.themoviedb.org/3/movie/${id}?api_key=9ca321e0477eb3e89ec7f2b59812c219&language=en-US`;
  //  console.log(url);
   fetchit(url);
}
let fetchit = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data=> {
        createCard(data);
      });
  }
  let createCard = (first) => {
        console.log(first);
        let imgurl = 'https://image.tmdb.org/t/p/w500'+first.poster_path;
        document.getElementById('img').innerHTML = `<img src="${imgurl}">`;
        document.getElementById('title').innerHTML = `<h1>${first.title}</h1>
                                                      <h3>**${first.tagline}**</h3>`;
        document.getElementById('summary').innerHTML = first.overview;

        let cardData = `
            <div class="infoCard">
            <a href="https://www.imdb.com/title/${first.imdb_id}/"><img src="../imdb.jpg"
             width="120px" height="50px"></a>
            </div>
            <div id="genres" class="infoCard">
              Genres: ${first.genres.map(item => `
                  <span>${item.name}.</span>`)}
            </div>
            <div id="popularity" class="infoCard"></div>
            <div id="releaseDate" class="infoCard"></div>
            <div id="budget" class="infoCard">Budget: $ ${first.budget}</div>
            <div id="revenue" class="infoCard">Revenue: $ ${first.revenue}</div>
            <div id="runtime" class="infoCard">Total Runtime: ${first.runtime} mins</div>
            <div id="status" class="infoCard">Release Status: ${first.status}</div>
            <div id="avgVote" class="infoCard">Average Rating ${first.vote_average} from ${first.vote_count} votes.</div>`;

      document.getElementById('otherInfo').innerHTML = cardData;
  
      }

