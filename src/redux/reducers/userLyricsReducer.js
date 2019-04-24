const userLyrics = (state = [], action) => {
    if (action.type === 'SET_USER_LYRICS') {
        return action.payload;
    }
    return state;
};

export default userLyrics;