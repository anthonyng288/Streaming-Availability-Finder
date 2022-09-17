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
    const searchMovieEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb.api_key}&language=${tmdb.language}&query=${req.params.movieTitle}`
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
    console.log("This is the movieEndpoint " + movieEndpoint);

    axios
    .get(movieEndpoint)
    .then((response) => {
        const {data} = response;
        const movieDetails = data;
        console.log(movieDetails);

        res.render("similarMovies", {movies: movieDetails});
        
    });
});

router.param("movieID", async (req, res, next, movieID) => {
    //console.log(movieID);
    const similarMovieEndpoint = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${tmdb.api_key}&language=${tmdb.language}&page=1`
    //give me similar movies, then use that to print everything
    //console.log("This is the similar movie endpoint" + similarMovieEndpoint);
    // axios 
    next();
})


const tmdb = {
    api_key: 'bbd65721f7d2491fab3bc98e879ff7d7',
    language: 'enUS',
    page: 1,
    include_adult: true,
    region: 'AU',
}


module.exports = router; 