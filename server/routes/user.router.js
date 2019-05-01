const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
var moment = require('moment');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)

  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req in post', req.body);

  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO "user" (username, password, first_name, last_name, email, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
  pool.query(queryText, [username, password, req.body.firstName, req.body.lastName, req.body.email, req.body.description])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/lyrics', (req, res) => {
  const userId = req.user.id;
  const sqlText = `SELECT * FROM "lyric_info" 
                   WHERE "user_id" = $1;`;

  pool.query(sqlText, [userId])
    .then((results) => {
      res.send(results.rows)
    })
    .catch((error) => {
      console.log('Something went wrong getting users lyrics', error);
      res.sendStatus(500);
    })
});

router.put('/lyrics', (req, res) => {
  let update = req.body;
  let userId = req.user.id;
  let date = moment().format();
  console.log('In lyric info update router: ', update);

  let sqlText = `UPDATE "lyric_info" 
                 SET "title" = $1, "date_edited" = $2, "author" = $3 
                 WHERE "id" = $4 AND "user_id" = $5;`;
  pool.query(sqlText, [update.title, date, update.author, update.songId, userId])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error updating lyric info', error);
      res.sendStatus(500);
    })
});

router.delete('/lyrics/delete/:id', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  let id = req.params.id;
  console.log('Delete params.id', id);

  try {
    lyricQuery = `DELETE FROM "lyrics" WHERE "lyric_id" = $1;`;
    lyricInfoQuery = `DELETE FROM "lyric_info" WHERE "id" = $1;`;


    await client.query('BEGIN')
    await client.query(lyricQuery, [id]);
    await client.query(lyricInfoQuery, [id]);

    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error deleting lyrics', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
});

router.put('/', (req, res) => {
  let update = req.body;
  let userId = req.user.id;
  console.log('In user info update router: ', update);

  let sqlText = `UPDATE "user" 
                 SET "username" = $1, "first_name" = $2, "last_name" = $3, "email" = $4, "description" = $5
                 WHERE "id" = $6;`;
  pool.query(sqlText, [update.username, update.first_name, update.last_name, update.email, update.description, userId])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error updating user info', error);
      res.sendStatus(500);
    })
});

module.exports = router;
