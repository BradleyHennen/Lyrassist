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

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('delete card id ', id);
    
    let sqlText = `DELETE FROM "lyrics" WHERE id = $1;`
    pool.query(sqlText, [id])
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Failed to remove lyric Card', error);
        console.log('Error', error);
        res.sendStatus(500);
    })
});

router.get('/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    const lyricId = req.params.id;
    console.log('req.user.id', req.user.id);
    const userId = req.user.id;

    let sqlText = (`SELECT "lyrics"."id" AS "lyrics_id", "lyrics"."lyrics", "lyrics"."song_label_id", "song_label"."label_name", "lyric_info"."title", "lyric_info"."lyric_order"
                    FROM "lyrics"
                    JOIN "lyric_info" ON "lyric_info"."id" = "lyrics"."lyric_id"
                    JOIN "user" ON "user"."id" = "lyric_info"."user_id"
                    JOIN "song_label" ON "song_label"."id" = "lyrics"."song_label_id"
                    WHERE "lyric_info"."user_id" = $1 AND "lyric_info"."id" = $2 AND "lyrics"."lyric_id" = $2;`)
    pool.query(sqlText, [userId, lyricId])
    .then((results) => {
        console.log('Success getting specified lyrics from user id and lyric id');
        
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Something went wrong getting lyrics', error);
        res.sendStatus(500);
    })
})

module.exports = router;