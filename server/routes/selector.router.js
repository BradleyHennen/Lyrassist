const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/querylist', (req, res) => {
    let sqlText = ('SELECT * FROM "query";');
    pool.query(sqlText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Something went wrong getting query list', error);
        res.sendStatus(500);
    });
});

router.get('/songpart', (req, res) => {
    let sqlText = ('SELECT * FROM "song_label";');
    pool.query(sqlText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Something went wrong getting song part list', error);
        res.sendStatus(500);
    });
});

module.exports = router;