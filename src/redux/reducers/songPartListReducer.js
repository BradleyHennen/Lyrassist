const songPartList = (state = [], action) => {
    switch (action.type) {
      case 'SET_SONG_PART_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  
export default songPartList;