import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* updateLyricInfo(action) {
    console.log('update lyric info: ', action.payload);

    try {
        yield axios.put(`/api/user/lyrics`, action.payload);
        yield put({ type: 'GET_LYRIC_INFO', payload: action.payload});
    }
    catch (error) {
        console.log(`Couldn't update lyric info`);
    }
}

function* updateLyricInfoSaga() {
    yield takeLatest('UPDATE_LYRIC_INFO', updateLyricInfo);
}

export default updateLyricInfoSaga;