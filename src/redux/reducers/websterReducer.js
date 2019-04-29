const websterReducer = (state = [], action) => {
    if (action.type === 'SET_WEBSTER') {
        return action.payload;
    }
    return state;
};

// loginMode will be on the redux state at:
// state.loginMode
  export default websterReducer;