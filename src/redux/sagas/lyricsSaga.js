import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getLyrics(action) {
    const lyricId = action.payload
    try {
        const response = yield axios.get(`/api/lyric/${lyricId}`);
        yield put({ type: 'SET_LYRICS', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get lyrics`);
    }
}

function* getLyricsSaga() {
    yield takeLatest('GET_LYRICS', getLyrics);
}

export default getLyricsSaga;