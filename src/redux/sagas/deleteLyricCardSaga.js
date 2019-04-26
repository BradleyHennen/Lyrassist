import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteLyricCard(action) {
    try {
        console.log('action.payload in delete', action.payload);

        let lyricId = action.payload.lyricId;
        let songId = action.payload.songId;
        yield axios.delete(`/api/lyric/${lyricId}`);
        yield put({ type: 'GET_LYRICS', payload: songId});
    }
    catch (error) {
        console.log(`Couldn't delete lyricCard`);
    }
}

function* deleteLyricCardSaga() {
    yield takeLatest('DELETE_LYRIC_CARD', deleteLyricCard);
}

export default deleteLyricCardSaga;