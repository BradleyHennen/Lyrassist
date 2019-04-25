import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteLyricCard(action) {
    try {
        let lyricCardId = action.payload
        console.log('LyricCardId', lyricCardId);
        
        yield axios.delete(`/api/lyric/${lyricCardId}`);
    }
    catch (error) {
        console.log(`Couldn't delete lyricCard`);
    }
}

function* deleteLyricCardSaga() {
    yield takeLatest('DELETE_LYRIC_CARD', deleteLyricCard);
}

export default deleteLyricCardSaga;