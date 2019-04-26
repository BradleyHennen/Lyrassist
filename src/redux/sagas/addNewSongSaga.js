import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* addNewSong(action) {    
    try {
        yield axios.post(`/api/lyric/newSong`, action.payload);
        yield put({ type: 'GET_USER_LYRICS'});
    }
    catch (error) {
        console.log(`Couldn't add lyric card`);
    }
}

function* addNewSongSaga() {
    yield takeLatest('ADD_NEW_SONG', addNewSong);
}

export default addNewSongSaga;