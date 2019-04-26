import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* addLyricCard(action) {    
    try {
        yield axios.post(`/api/lyric`, action.payload);
        yield put({ type: 'GET_LYRICS', payload: action.payload.lyricId});
    }
    catch (error) {
        console.log(`Couldn't add lyric card`);
    }
}

function* addLyricCardSaga() {
    yield takeLatest('ADD_LYRIC_CARD', addLyricCard);
}

export default addLyricCardSaga;