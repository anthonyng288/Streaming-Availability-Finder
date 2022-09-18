const express = require('express');
const router = express.Router();
const axios = require("axios");

router.get('/', (req, res) => {
    res.render('searchRegion');
});

router.post('/', (req, res) => {
    res.redirect(`/region/${req.body.region}`);
})


router.get("/:region", (req, res) => {
    console.log(req.params.region);
});


module.exports = router;