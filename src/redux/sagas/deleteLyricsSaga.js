import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteLyrics(action) {
    try {
        
        let lyricsId = action.payload
        yield axios.delete(`/api/user/lyrics/delete/${lyricsId}`);
        yield put({ type: 'GET_USER_LYRICS'})
    }
    catch (error) {
        console.log(`Couldn't delete user lyrics`);
    }
}

function* deleteLyricsSaga() {
    yield takeLatest('DELETE_LYRICS', deleteLyrics);
}

export default deleteLyricsSaga;