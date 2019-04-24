const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/info', (req, res) => {
    let sqlText = ('SELECT * FROM "lyric_info";')
    pool.query(sqlText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Something went wrong getting lyric info', error);
        res.sendStatus(500);
    })
})

router.get('/', (req, res) => {
    let sqlText = ('SELECT * FROM "lyrics";')
    pool.query(sqlText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Something went wrong getting lyrics', error);
        res.sendStatus(500);
    })
})

module.exports = router;