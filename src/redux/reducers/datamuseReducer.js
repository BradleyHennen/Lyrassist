const datamuseData = (state = [], action) => {
    if (action.type === 'SET_DATAMUSE') {
        return action.payload;
    }
    return state;
};

// loginMode will be on the redux state at:
// state.loginMode
  export default datamuseData;