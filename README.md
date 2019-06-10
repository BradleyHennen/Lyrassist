# LyrAssist

The LyrAssist application gives lyricists an easy to use interface that will assist them in the writing process through a word and phrase search function, organizational tool, and storage/management options. Users will are able to create and organize song lyric components that can be further edited, deleted, and/or saved.

## Built With

- React
- Redux
- Node
- JavaScript
- Express
- PostgreSQL
- Datamuse API
- Webster API
- React-beautiful-dnd (Drag N Drop)
- Material-UI
- HTML
- CSS
- Axios
- Bcrypt
- Cookie-session
- Dotenv
- Passport
- Passport-local

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Link to software that is required before you attempt to start the app.

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Create Database and Table

Create a new database called `lyrassist` and run the SQL query from the database.sql file. 

### Installing

Steps to get the development environment running.

1. Download this project.
2. Start postgres if not running already by using `brew services start postgresql`
3. `npm install`
4. `npm run server`
5. `npm run client`
6. Navigate to `localhost:3000`

## Documentation

Link to a original read-only version of LyrAssist scope document
- [GoogleDoc](https://docs.google.com/document/d/1hxuTf0QiDr_fvdQYfavbaTfPGLlovFB7Khf7eMD53co)

### Completed Features

- [x] Datamuse API integration for rhyme, synonym, etc. search functionallity
- [x] Webster API integration for word definition
- [x] Lyric Card creation with Drag and Drop implementation
- [x] Passport authentication
- [x] Material-UI styling
- [x] User lyric management

### Next Steps

- [ ] Lyric sharing feature
- [ ] Lyric community forum

## Authors

* Bradley Richard Hennen
