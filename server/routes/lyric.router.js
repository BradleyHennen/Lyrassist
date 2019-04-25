const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/info/:id', (req, res) => {
    let songId = req.params.id
    let sqlText = ('SELECT * FROM "lyric_info" WHERE "id" = $1;')
    pool.query(sqlText, [songId])
        .then((results) => {
            res.send(results.rows[0]);
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

router.put('/', (req, res) => {
    let update = req.body;
    let sqlText = 'UPDATE "lyrics" SET "lyrics" = $1, "song_label_id" = $2 WHERE "id" = $3;';
    pool.query(sqlText, [update.lyrics, update.song_label_id, update.lyric_id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error updated lyric card', error);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    let newCard = req.body;
    console.log('new Lyric Card info:', newCard);

    let sqlText = `INSERT INTO "lyrics" ("song_label_id", "lyric_id", "lyrics")
                   VALUES ($1, $2, 'Add lyrics');`;
    pool.query(sqlText, [newCard.songLabelId, newCard.lyricId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error adding new lyric card', error);
            res.sendStatus(500);
        })
});

router.post('/newSong', (req, res) => {
    let newSong = req.body;
    let userId = req.user.id;
    let date = moment().format();
    console.log('new song info:', newCard);

    let sqlText = `INSERT INTO "lyric_info" ("user_id", "title", "date_created", "date_edited", "author")
                   VALUES ($1, $2, 'Add lyrics');`;
    pool.query(sqlText, [userId, newSong.title, date, date, newSong.author])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error adding new lyric card', error);
            res.sendStatus(500);
        })
});

router.get('/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    const lyricId = req.params.id;
    console.log('req.user.id', req.user.id);
    const userId = req.user.id;

    let sqlText = (`SELECT "lyrics"."id" AS "lyrics_id", "lyrics"."lyrics", "lyrics"."song_label_id", "song_label"."label_name"
                    FROM "lyrics"
                    JOIN "lyric_info" ON "lyric_info"."id" = "lyrics"."lyric_id"
                    JOIN "user" ON "user"."id" = "lyric_info"."user_id"
                    JOIN "song_label" ON "song_label"."id" = "lyrics"."song_label_id"
                    WHERE "lyric_info"."user_id" = $1 AND "lyric_info"."id" = $2 AND "lyrics"."lyric_id" = $2
                    ORDER BY "lyrics_id" ASC;`)
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