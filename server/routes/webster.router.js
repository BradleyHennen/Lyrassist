const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/:query', (req, res) => {
    const query = req.params.query;
    console.log('Webster query: ', query);
    
    const key = process.env.API_KEY;
    let endpoint = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${key}`;

    axios.get(endpoint)
    .then((response) => {
        res.send(response.data);
    }).catch((error) => {
        console.log('', error);
        
        res.sendStatus(500)
    })
})
module.exports = router;