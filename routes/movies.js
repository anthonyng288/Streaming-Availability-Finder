var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render("similarMovies");
});

router.post('/', (req, res) => {
  console.log(req.body.favoriteMovie);
  res.send(`${req.body.favoriteMovie}`)

})

// router.get('/search/:movieTitle', (req, res) => {
//     res.write('You are searching for: ' + req.params.movieTitle);
//     res.end();
// });

module.exports = router;
