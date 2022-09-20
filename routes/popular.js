const express = require('express');
const router = express.Router();
const axios = require("axios");
const { response } = require('../app');
const { route } = require('.');

router.get('/', (req, res) => {
    res.render('searchRegion');
});

router.post('/', (req, res) => {
    res.redirect(`/popular/${req.body.region}`);
})


router.get("/:region", (req, res) => {
    const listofRegionsEndpoint = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${tmdb.api_key}&language=en-US`
    console.log("User Input: " + req.params.region);
    axios
    .get(listofRegionsEndpoint)
    .then(async (response) => {

        const {data} = response;
        const regions = data.results;
        let isoRegion = await regionConverter(req.params.region, regions);
        console.log("Region converter return: " + isoRegion);
        
        // if(isoRegion !== "Null" || undefined){
        //     res.redirect('/popular/error')
        // } else {
            res.redirect(`/popular/movie/${isoRegion}`);
            
        // }
        
    })

});

router.get("/movie/:isoRegion", (req, res) => {
    const popularMoviesEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb.api_key}&language=${tmdb.language}&page=1&region=${req.params.isoRegion}`
    console.log(popularMoviesEndpoint);
    axios
        .get(popularMoviesEndpoint)
        .then((response) => {
            const {data} = response;
            const regionMovies = data.results 
            const topTenRegionMovies = regionMovies.splice(0, 10);
            res.render("movieSelect", {movies: topTenRegionMovies, search_query: req.params.isoRegion});
        });

});


// router.get("/error", (req , res) => {
//     res.render("error");
// });


function regionConverter(userInput, rsp){   
    let isoRegion = "Null";
    let validUserInput = validateUserInputRegion(userInput);

    for(let i = 0; i < rsp.length; i++){
        let regionObj = rsp[i];
        if(regionObj.english_name !== validUserInput){
            console.log("Region Converter: Could not find region");
        }else{
            isoRegion = regionObj.iso_3166_1;
            break;
        }
    }
    return isoRegion;
}

function validateUserInputRegion(userInput){
    return userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();
}

const tmdb = {
    api_key: process.env.TMDB_API_KEY,
    language: 'enUS',
    page: 1,
    include_adult: true,
}


module.exports = router;