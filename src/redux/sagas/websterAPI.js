import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getWebster(action) {
    console.log('Get Webster: ', action.payload);
    
    try {
        const response = yield axios.get(`/api/webster/${action.payload}`);
        yield put({ type: 'SET_WEBSTER', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get webster items`);
    }
}

function* getWebsterAPI() {
    yield takeLatest('GET_WEBSTER', getWebster);
}

export default getWebsterAPI;