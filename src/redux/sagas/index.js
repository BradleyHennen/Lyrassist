import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getDatamuseAPI from './datamuseAPI';
import getQueryList from './queryList';
import getLyricInfo from './lyricInfoSaga';
import getLyrics from './lyricsSaga';
import getUserLyrics from './userLyricsSaga';
import deleteLyrics from './deleteLyricsSaga';
import getSongPartList from './songPartList';
import deleteLyricCard from './deleteLyricCardSaga';
import updateLyricCard from './updateLyricCardSaga';
import addLyricCard from './addLyricCardSaga';
import addNewSong from './addNewSongSaga';
import updateLyricCardOrder from './updateLyricCardOrderSaga';
import updateLyricInfo from './updateLyricInfoSaga';
import getWebsterAPI from './websterAPI';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    getDatamuseAPI(),
    getWebsterAPI(),
    getQueryList(),
    getSongPartList(),
    getLyricInfo(),
    getLyrics(),
    getUserLyrics(),
    deleteLyrics(),
    deleteLyricCard(),
    updateLyricCard(),
    updateLyricInfo(),
    updateLyricCardOrder(),
    addLyricCard(),
    addNewSong(),
  ]);
}
