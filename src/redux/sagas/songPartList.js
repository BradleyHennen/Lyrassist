import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getSongPartList(action) {
    try {
        const response = yield axios.get(`/api/selector/songpart`);        
        yield put({ type: 'SET_SONG_PART_LIST', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get query list`);
    }
}

function* getSongPartListSaga() {
    yield takeLatest('GET_SONG_PART_LIST', getSongPartList);
}

export default getSongPartListSaga;