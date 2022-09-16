var express = require('express');
var https = require('https');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('similarMovies')
})

router.post('/', (req, res) => {
    console.log(req.body.favoriteMovie);
    res.redirect(`/search/${req.body.favoriteMovie}`)
})

router.get('/:movieTitle', (req, res) => {
    const options = createMovieOptions(req.params.movieTitle);
    console.log(options)
    const movieReq = https.request(options, (movieRes) => {
            //Callback function, deals with what we get 
            let body = [];
            movieRes.on('data', function(chunk){
                body.push(chunk);
            })
            movieRes.on('end', function() {
                res.writeHead(movieRes.statusCode,{'content-type': 'text/html'});
                const bodyString = body.join('');
                const rsp = JSON.parse(bodyString);   
                console.log(rsp.results[0].poster_path);  
                const s = createPage(rsp);
                res.write(s);
                res.end()
            });

    })
    movieReq.on('error', (e) => {
        console.log(e);
    })
    movieReq.end();
});

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
    for(let i = 0; i < rsp.results.length; i++){
        movie = rsp.results[i];
        posterUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        movieDetailsUrl = `'https://api.themoviedb.org/3/movie/${movie.id}?api_key=bbd65721f7d2491fab3bc98e879ff7d7&language=en-US'`
        s+= `<a href="${movieDetailsUrl}"><img alt="${movie.title}" src="${posterUrl}"/></a>`;
    }
}
function createPage(rsp){
    const number = rsp.results.length;
    const imageString = parseMovieRsp(rsp);
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