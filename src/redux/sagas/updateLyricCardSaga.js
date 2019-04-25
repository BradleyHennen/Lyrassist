import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* updateLyricCard(action) {
    console.log('update lyric card: ', action.payload);
    try {
        const response = yield axios.put(`/api/lyric`, action.payload);
    }
    catch (error) {
        console.log(`Couldn't update lyric card`);
    }
}

function* updateLyricCardSaga() {
    yield takeLatest('UPDATE_LYRIC_CARD', updateLyricCard);
}

export default updateLyricCardSaga;