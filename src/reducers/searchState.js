const stateSearch = {
  typeSearch: null,
  text: null,
}

const searchState = (state = stateSearch, action) => {
  switch (action.type) {
    case 'SEARCH_FILE':
      return {
        typeSearch: action.typeSearch,
        text: action.text,
      }
    default:
      return state;
  }
};

export default searchState;
