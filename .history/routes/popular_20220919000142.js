const express = require('express');
const router = express.Router();
const axios = require("axios");
const { response } = require('../app');

router.get('/', (req, res) => {
    res.render('searchRegion');
});

router.post('/', (req, res) => {
    res.redirect(`/popular/${req.body.region}`);
})


router.get("/:region", (req, res) => {
    const listofRegionsEndpoint = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${tmdb.api_key}&language=en-US`
    const popularMoviesEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb.api_key}&language=${tmdb.language}&page=1&region=`

    axios
    .get(listofRegionsEndpoint)
    .then((response) => {
        const {data} = response;
        const regions = data.results;
        console.log(regions);
    })

});



const tmdb = {
    api_key: process.env.TMDB_API_KEY,
    language: 'enUS',
    page: 1,
    include_adult: true,
}

module.exports = router;