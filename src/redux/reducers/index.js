import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import datamuseData from './datamuseReducer';
import queryList from './queryListReducer';
import lyricInfo from './lyricInfoReducer';
import lyrics from './lyricsReducer';
import userLyrics from './userLyricsReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user,
  datamuseData,
  queryList,
  lyricInfo,
  lyrics,
  userLyrics,
});

export default rootReducer;
