import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* updateLyricCard(action) {
    console.log('update lyric card: ', action.payload);
    let songId = action.payload.songId;
    console.log('update lyric card songId: ', songId);

    try {
        yield axios.put(`/api/lyric`, action.payload);
        yield put({ type: 'GET_LYRICS', payload: action.payload.song_id});
    }
    catch (error) {
        console.log(`Couldn't update lyric card`);
    }
}

function* updateLyricCardSaga() {
    yield takeLatest('UPDATE_LYRIC_CARD', updateLyricCard);
}

export default updateLyricCardSaga;