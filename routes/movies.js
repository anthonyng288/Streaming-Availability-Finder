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

router.get('/:movieTitle', (req, res) => {
    res.send('No idea what this does yet');
});

module.exports = router;
