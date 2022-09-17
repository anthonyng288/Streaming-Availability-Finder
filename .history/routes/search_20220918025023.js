const express = require('express');
const router = express.Router();
const axios = require("axios");



router.get('/', (req, res) => {
    res.render('searchMovie')
})

router.post('/', (req, res) => {
    res.redirect(`/search/${req.body.favoriteMovie}`)
    console.log("From input" + req.body.favoriteMovie);
})

router.get("/:movieTitle", (req, res) => {
    const searchMovieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb.api_key}&language=${tmdb.language}&query=${req.params.movieTitle}`; //make this more modualr
    console.log("From movieTitle Route " + req.params.movieTitle);
    console.log("Movie endpoint: " + searchMovieEndpoint);
    axios   
        .get(searchMovieEndpoint)
        .then((response) => {
            const {data} = response;
            const allMovies = data.results;

            const topTenMovies = allMovies.splice(0, 10);
            res.render("movieSelect", {movies: topTenMovies});
        });
        // .catch((error) =>=df
        //     console.log(err
        // }
})

router.get("/movie/:movieID", (req, res) => {
    const movieEndpoint = `https://api.themoviedb.org/3/movie/${req.params.movieID}?api_key=bbd65721f7d2491fab3bc98e879ff7d7&language=en-US`
    const similarMovieEndpoint = `https://api.themoviedb.org/3/movie/${req.params.movieID}/similar?api_key=${tmdb.api_key}&language=${tmdb.language}&page=1`
    //console.log("This is the movieEndpoint " + movieEndpoint);

    let endpoints = [movieEndpoint, similarMovieEndpoint];
    // const movieRequest = axios.get(movieEndpoint);
    // const similarMovieRequest = axios.get(similarMovieEndpoint);
    
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([ {data: listOfMovies}, {data: listOfSimilarMovies} ]) => {
        const data = listOfMovies.data.results;
        const allMovies = data;
        //const allSimilarMovies = listOfSimilarMovies.results;
        console.log("This is movies" + allMovies);
        //console.log("This is similar movies" + allSimilarMovies);


        //res.render("similarMovies", {movies: movies, similar: similars});
        });
    });


const tmdb = {
    api_key: 'bbd65721f7d2491fab3bc98e879ff7d7',
    language: 'enUS',
    page: 1,
    include_adult: true,
    region: 'AU',
}


module.exports = router; 