import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getQueryList(action) {
    try {
        const response = yield axios.get(`/api/selector/querylist`);
        console.log('getQueryList: ', response.data);
        
        yield put({ type: 'SET_QUERY_LIST', payload: response.data })
    }
    catch (error) {
        console.log(`Couldn't get query list`);
    }
}

function* getQueryListSaga() {
    yield takeLatest('GET_QUERY_LIST', getQueryList);
}

export default getQueryListSaga;