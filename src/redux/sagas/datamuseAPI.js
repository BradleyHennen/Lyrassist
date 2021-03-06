import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getDatamuse(action) {
    try {
        const response = yield axios.get(`/api/datamuse/${action.payload}`);
        yield put({ type: 'SET_DATAMUSE', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get datamuse items`);
    }
}

function* getDatamuseAPI() {
    yield takeLatest('GET_DATAMUSE', getDatamuse);
}

export default getDatamuseAPI;