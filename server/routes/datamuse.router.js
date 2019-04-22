const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res) => {
    
    let endpoint = `https://api.datamuse.com/words?ml=ringing+in+the+ears&max=4`;

    axios.get(endpoint)
    .then((response) => {
        res.send(response.data);
    }).catch((error) => {
        console.log('', error);
        
        res.sendStatus(500)
    })
})
module.exports = router;