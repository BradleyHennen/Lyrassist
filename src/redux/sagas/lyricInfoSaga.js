import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getLyricInfo(action) {
    const songId = action.payload;
    console.log('getLyricInfo id', songId);
    
    try {
        const response = yield axios.get(`/api/lyric/info/${songId}`);
        yield put({ type: 'SET_LYRIC_INFO', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get lyric info`);
    }
}

function* getLyricInfoSaga() {
    yield takeLatest('GET_LYRIC_INFO', getLyricInfo);
}

export default getLyricInfoSaga;