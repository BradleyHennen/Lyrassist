const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/:query', (req, res) => {
    console.log('In Datamuse GET. Req.params:', req.params.query);
    
    const query = req.params.query;
    let endpoint = `https://api.datamuse.com/words?${query}&max=10`;

    axios.get(endpoint)
    .then((response) => {
        res.send(response.data);
    }).catch((error) => {
        console.log('', error);
        
        res.sendStatus(500)
    })
})
module.exports = router;