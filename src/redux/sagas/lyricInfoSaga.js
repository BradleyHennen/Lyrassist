import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getLyricInfo(action) {
    try {
        const response = yield axios.get(`/api/lyric/info`);
        yield put({ type: 'SET_LYRIC_INFO', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get datamuse items`);
    }
}

function* getLyricInfoSaga() {
    yield takeLatest('GET_LYRIC_INFO', getLyricInfo);
}

export default getLyricInfoSaga;