const express = require('express');
const https = require('https');
const router = express.Router();
const axios = require("axios");
const { response } = require('../app');

router.get('/', (req, res) => {
    res.render('searchMovie')
})

router.post('/', (req, res) => {
    res.redirect(`/search/${req.body.favoriteMovie}`)
    console.log("From input" + req.body.favoriteMovie);
})

router.get("/:movieTitle", (req, res) => {
    const searchMovieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=bbd65721f7d2491fab3bc98e879ff7d7&language=enUS&query=${req.params.movieTitle}`;
    console.log("From movieTitle Route " + req.params.movieTitle);
    console.log("Movie endpoint: " + searchMovieEndpoint);
    axios   
        .get(searchMovieEndpoint)
        .then((response) => {
            const {data} = response;
            const allMovies = data.results;

            const topTenMovies = allMovies.splice(0, 10);
            // console.log(topTenMovies);
            res.render("movieSelect", {movies: topTenMovies});
            console.log(topTenMovies);
        });
        // .catch((error) => {
        //     console.log(erro
        // }
})

router.get("/movie/:movieID", (req, res) => {
    const movieEndpoint = `https://api.themoviedb.org/3/movie/${req.params.movieID}?api_key=bbd65721f7d2491fab3bc98e879ff7d7&language=en-US`
    console.log("This is the movieEndpoint " + movieEndpoint);

    axios
    .get(movieEndpoint)
    .then((response) => {
        const {data} = response;
        const movieDetails = data;

        res.render("similiarMovies", {movies: movieDetails});
        
    });
});





// router.get('/:movieTitle', (req, res) => 
//     const options = createMovieOptions(req.params.movieTitle);//Await/promise here?
//     //console.log(options)
//     const movieReq = https.request(options, (movieRes) => {
//             //Callback function, deals with what we get 
//             let body = [];
//             movieRes.on('data', function(chunk){
//                 body.push(chunk);
//             })
//             movieRes.on('end', function() {
//                 res.writeHead(movieRes.statusCode,{'content-type': 'text/html'});
//                 const bodyString = body.join('');
//                 const rsp = JSON.parse(bodyString);   
//                 //console.log(rsp.results[0].poster_path);  
//                 const s = createPage(rsp);
//                 res.write(s);
//                 res.end()
//             });

//     })
//     movieReq.on('error', (e) => {
//         console.log(e);
//     })
//     movieReq.end();
// });

const tmdb = {
    api_key: 'bbd65721f7d2491fab3bc98e879ff7d7',
    language: 'enUS',
    page: 1,
    include_adult: true,
    region: 'AU',
}

function createMovieOptions(query){
    const options = {
        hostname: 'api.themoviedb.org',
        port: 443,
        path: '/3/search/movie?',
        method: 'GET'
    }
    const str = "api_key=" + tmdb.api_key + 
                "&language=" + tmdb.language +
                "&query=" + query + 
                "&page=" + tmdb.page + 
                "&include_adult=" + tmdb.include_adult + 
                "&region=" + tmdb.region;
    options.path += str;
    return options;
}

function parseMovieRsp(rsp){
    let s = "";
    for (let i = 0; i < rsp.results.length; i++){
        movie = rsp.results[i];
        posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`
        movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=bbd65721f7d2491fab3bc98e879ff7d7&language=en-US`
        s+= `<a href="${movieDetailsUrl}"><img alt="${movie.title}" src="${posterUrl}"/></a>`;
        // console.log(movie.original_title);
        //console.log(s);
        //console.log(movieDetailsUrl);
    }
    console.log(s);
    return s;
}
function createPage(rsp){
    const number = rsp.results.length;
    const imageString = parseMovieRsp(rsp);
    //console.log("This is the image string " + imageString);
    const str = '<!DOCTYPE html>' +
    '<html><head><title>Movie JSON</title></head>'+
       ' <body>' +        
       ' <h1>Movies</h1>' +        
        'Total number of entries is:' + number +'</br>'      
        + imageString +          
       ' </body></html>';
    return str;
}

module.exports = router; 