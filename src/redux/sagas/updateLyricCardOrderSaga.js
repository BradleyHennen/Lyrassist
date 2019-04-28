import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* updateLyricCardOrder(action) {
    console.log('update lyric card ORDER: ', action.payload);
    try {
        yield axios.put(`/api/lyric/order`, action.payload);
        yield put({ type: 'GET_LYRICS', payload: action.payload.song_id});

    }
    catch (error) {
        console.log(`Couldn't update lyric card`);
    } 
}


function* updateLyricCardOrderSaga() {
    yield takeLatest('UPDATE_LYRIC_CARD_ORDER', updateLyricCardOrder);
}

export default updateLyricCardOrderSaga;