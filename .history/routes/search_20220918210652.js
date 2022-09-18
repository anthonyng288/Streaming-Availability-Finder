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
        
        console.log(listOfSimilarMovies);
        const topTenSimilarMovies = listOfSimilarMovies.results.splice(0, 10);
        console.log(topTenSimilarMovies);
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




const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/get/basic',
    params: {country: 'us', tmdb_id: 'movie/120', output_language: 'en'},
    headers: {
      'X-RapidAPI-Key': process.env.STREAMING_API_KEY,
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };
  
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });






module.exports = router; 