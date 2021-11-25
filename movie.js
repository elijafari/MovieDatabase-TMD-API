const Api_Key='api_key=67f99b90894878a1a2ea062b16e69d80';
const baseUrl= 'https://api.themoviedb.org/3/';
const Api_Url= baseUrl+'discover/movie?sort_by=popularity.desc&'+Api_Key;
const baseImage= 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById("main")
const search= document.getElementById("search")
const form = document.getElementById("form")
const search_Url= baseUrl+'search/movie?'+Api_Key;

fetchMovies(Api_Url);

function fetchMovies(url){
    fetch(url).then(response => 
        response.json()).then(data =>{
            console.log(data)
            showMovies(data.results);
    })
}
function showMovies(data){
    main.innerHTML="";

    data.forEach(movie => {
            const {title, vote_average, overview,poster_path,release_date,genre_ids}= movie
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            const genre= getGenre(genre_ids)
            movieElement.innerHTML= `
                <img src="${baseImage+poster_path}" alt="${title}">
                <div class="movie-info">
                    <h2>${title}</h2>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                    <h3>Release at ${release_date}</h3>
                    <h3>Genre: ${genre}</h3>

                </div>
        `
        main.appendChild(movieElement);
    })
}

function getGenre(ids){
    for(let id of ids) {
        switch(id){
            case 37:
                return "Western"
            case 28:
                return "Action"
            case 10752:
                return "War"
            case 27:
                return "Horror"
            case 16:
                return "Animation"
            case 14:
                return "Fantasy"
            case 35:
                return "Comedy"
            case 10751:
                return "Family"
            case 18:
                return "Drama"
            case 10749:
                return "Romance"
            case 12:
                return "Adventure"
            case 99:
                return "Documentary"
            case 36:
                return "History"
            case 878:
                return "Science"
            break;
        }
    };
}
function getColor(vote){
    if(vote>=7){
        return "green";
    }else if(vote>=5){
        return "orange"
    }else{
        return "red"
    }
}
form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = search.value;
    searchUrl=`${search_Url}&query=${searchTerm}`
    console.log(searchUrl)
    console.log(searchTerm)
    if(searchTerm){
        fetchMovies(searchUrl)
    }else{
        fetchMovies(Api_Url);
    }

})
function action(){
    let genre= "&with_genres=28,10752,37"
    genreUrl=Api_Url+genre
        fetchMovies(genreUrl)
    }
    function documentary(){
        let genre= "&with_genres=99,36,878"
        genreUrl=Api_Url+genre
        fetchMovies(genreUrl)
    }
    function animation(){
        let genre= "&with_genres=16,14"
        genreUrl=Api_Url+genre
        fetchMovies(genreUrl)
    }
    function family(){
        let genre= "&with_genres=35,10751,18,10749"
        genreUrl=Api_Url+genre
        fetchMovies(genreUrl)
    }
    function tvAiringToday(){
        tvUrl=baseUrl+'tv/airing_today?'+Api_Key
        fetchMovies(tvUrl)
}
// {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}
// Horror 27
// Action war Western 28,10752,37
// Animation Fantasy 16,14
// Comedy family Drama  Romance 35,10751,18,10749
// Documentary  History Science Fiction 99,36,878