const lyrics = (state = {}, action) => {
    if (action.type === 'SET_LYRICS') {
        return action.payload;
    }
    return state;
};

export default lyrics;