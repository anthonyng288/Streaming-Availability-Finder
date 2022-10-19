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
    axios
    .get(listofRegionsEndpoint)
    .then(async (response) => {

        const {data} = response;
        const regions = data.results;
        let isoRegion = await regionConverter(req.params.region, regions);
        
        if(isoRegion === "Null" || undefined){
            res.render("popularError");
        } else {
            res.redirect(`/popular/movie/${isoRegion}`);
            
        }
        
    })

});

router.get("/movie/:isoRegion", (req, res) => {
    const popularMoviesEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb.api_key}&language=${tmdb.language}&page=1&region=${req.params.isoRegion}`
   
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

    axios
        .get(popularMoviesEndpoint)
        .then((response) => {
            const {data} = response;
            const regionMovies = data.results 
            const topTenRegionMovies = regionMovies.splice(0, 10);

            let movieStreamingService = [];
            let formattedStreamingService = [];
            let flattenedServices = [];
    
            async function makePromises(topTenRegionMovies){
    
                for (let i = 0; i< topTenRegionMovies.length; i++){
                    var streamResponse = await (streamingAvailabilityAPI(topTenRegionMovies[i].id));
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
    
                for(let i = 0; i < topTenRegionMovies.length; i++){
                    var id = topTenRegionMovies[i].id;
                    var poster = topTenRegionMovies[i].poster_path;
                    var title = topTenRegionMovies[i].title;
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
                //res.render("similarMovies", {movies: detailOfMovies, similarMovies : html});
                res.render("popularMovie", {movies: html, search_query: req.params.isoRegion});
            }
    
            makePromises(topTenRegionMovies);
        
            
        });

});



function regionConverter(userInput, rsp){   
    let isoRegion = "Null";
    let validUserInput = validateUserInputRegion(userInput);

    for(let i = 0; i < rsp.length; i++){
        let regionObj = rsp[i];
        if(regionObj.english_name !== validUserInput){
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