import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getUserLyrics(action) {
    console.log("user id action.payload:", action.payload)
    try {
        const response = yield axios.get(`/api/user/lyrics/${action.payload}`);
        yield put({ type: 'SET_USER_LYRICS', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get user lyrics`);
    }
}

function* getUserLyricsSaga() {
    yield takeLatest('GET_USER_LYRICS', getUserLyrics);
}

export default getUserLyricsSaga;