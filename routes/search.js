const express = require('express');
const router = express.Router();
const axios = require("axios");

router.get('/', (req, res) => {
    res.render('searchMovie')
})

router.post('/', (req, res) => {
    res.redirect(`/search/${req.body.favoriteMovie}`)
    
})

router.get("/:movieTitle", (req, res) => {
    const searchMovieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb.api_key}&language=${tmdb.language}&query=${req.params.movieTitle}`;

    axios   
        .get(searchMovieEndpoint)
        .then((response) => {
            const {data} = response;
            const allMovies = data.results;
            const topTenMovies = allMovies.splice(0, 10);
            res.render("movieSelect", {movies: topTenMovies, search_query: req.params.movieTitle});
        });
    
    
        // .catch((error) =>=df
        //     console.log(err
        // }
})

router.get("/movie/:movieID", (req, res) => {
    const movieEndpoint = `https://api.themoviedb.org/3/movie/${req.params.movieID}?api_key=${tmdb.api_key}&language=en-US`
    const similarMovieEndpoint = `https://api.themoviedb.org/3/movie/${req.params.movieID}/similar?api_key=${tmdb.api_key}&language=${tmdb.language}&page=${tmdb.page}`
    
    async function streamingAvailabilityAPI(movieID){
        const options = {
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/get/basic',
            params: {country: 'us', tmdb_id: `movie/${movieID}`, output_language: 'en'},
            headers: {
              'X-RapidAPI-Key': process.env.STREAMING_API_KEY,
              'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                }
            };
    
        var response = await axios.request(options).then(response => response.data);
        return response;
    }

    

    let endpoints = [movieEndpoint, similarMovieEndpoint];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([ {data: detailOfMovies}, {data: listOfSimilarMovies} ]) => {
        const topTenSimilarMovies = listOfSimilarMovies.results.splice(0, 10);
        let movieStreamingService = [];
        let formattedStreamingService = [];
        let flattenedServices = [];

        async function makePromises(topTenSimilarMovies){

            for (let i = 0; i< topTenSimilarMovies.length; i++){
                var streamResponse = await (streamingAvailabilityAPI(topTenSimilarMovies[i].id));
                movieStreamingService.push(streamResponse.streamingInfo);

            }

            for(let i = 0; i < movieStreamingService.length; i++){
                let keys = Object.keys(movieStreamingService[i]);
                formattedStreamingService.push(keys);
                
            }
            
            for(let i = 0; i< formattedStreamingService.length; i++){
                if(formattedStreamingService[i][0] === undefined){
                    flattenedServices.push(' ');
                }else{
                    flattenedServices.push(formattedStreamingService[i][0]);
                }
            }
            
            for(let i = 0; i < flattenedServices.length; i++){
                var html = "p" +
                flattenedServices.toString(flattenedServices);
            }

            var html = "<div class=movie_list>";

            for(let i = 0; i < topTenSimilarMovies.length; i++){
                var id = topTenSimilarMovies[i].id;
                var poster = topTenSimilarMovies[i].poster_path;
                var title = topTenSimilarMovies[i].title;
                var streams =  flattenedServices[i].toString(flattenedServices);

                if(streams === " "){
                    streams = "No Service Available"
                }

                var htmlMovie =
                '<div class = "movie_display">' +
                '<a href="/search/movie/' + id +'">' +
                '<img class="movie_poster" src="https://image.tmdb.org/t/p/original' + poster +  '" alt="' + title + '">' +
                '</a>'+
                '<p class="stream">' + streams + '</p>' +
                '</div>'   
                
                html = html + htmlMovie;  
            }

            html = html + "</div>"
            res.render("similarMovies", {movies: detailOfMovies, similarMovies : html});
        }

        makePromises(topTenSimilarMovies);
        
    });

});

    
const tmdb = {
    api_key: process.env.TMDB_API_KEY,
    language: 'enUS',
    page: 1,
    include_adult: true,
    region: 'AU',
}










  //I make some middleware to take a movie, which then requests from options and then use that to get movie streaming info


  
  





module.exports = router; 