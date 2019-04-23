const queryList = (state = [], action) => {
    switch (action.type) {
      case 'SET_QUERY_LIST':
        console.log('queryList reducer', action.payload);
        
        return action.payload;
      default:
        return state;
    }
  };
  
export default queryList;