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

    let endpoints = [movieEndpoint, similarMovieEndpoint];
    
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([ {data: detailOfMovies}, {data: listOfSimilarMovies} ]) => {
        const topTenSimilarMovies = listOfSimilarMovies.results.splice(0, 10);
        //console.log(topTenSimilarMovies);
        res.render("similarMovies", {movies: detailOfMovies, similarMovies: topTenSimilarMovies});
        });
    });


    
const tmdb = {
    api_key: process.env.TMDB_API_KEY,
    language: 'enUS',
    page: 1,
    include_adult: true,
    region: 'AU',
}

let streamingAvailabilityApp = streamingAvailabilityAPI(603);

console.log("THis is my streaming app " + streamingAvailabilityApp);



function streamingAvailabilityAPI(query){
    let streamingResponse = "Nothing"
    const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/get/basic',
        params: {country: 'us', tmdb_id: `movie/${query}`, output_language: 'en'},
        headers: {
          'X-RapidAPI-Key': process.env.STREAMING_API_KEY,
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        streamingResponse = JSON.stringify(response.data);
        return streamingResponse;
        //console.log("This is streaming response " + streamingResponse);
    }).catch(function (error) {
        console.error(error);
    });
    
}




  //I make some middleware to take a movie, which then requests from options and then use that to get movie streaming info


  
  





module.exports = router; 