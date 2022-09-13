var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This route will show all of the movies i guess');
});

router.get('/:movieTitle', (req, res) => {
    res.send(`Get movies similar to ${req.params.movieTitle}`);
});

module.exports = router;
