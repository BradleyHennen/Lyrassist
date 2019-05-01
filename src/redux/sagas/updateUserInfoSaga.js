import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* updateUserInfo(action) {
    console.log('update user info: ', action.payload);

    try {
        yield axios.put(`/api/user/`, action.payload);
        yield put({ type: 'FETCH_USER' });
    }
    catch (error) {
        console.log(`Couldn't update user info`);
    }
}

function* updateUserInfoSaga() {
    yield takeLatest('UPDATE_USER_INFO', updateUserInfo);
}

export default updateUserInfoSaga;