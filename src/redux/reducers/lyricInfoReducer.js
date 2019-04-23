const lyricInfo = (state = [], action) => {
    if (action.type === 'SET_LYRIC_INFO') {
        return action.payload;
    }
    return state;
};

// loginMode will be on the redux state at:
// state.loginMode
  export default lyricInfo;