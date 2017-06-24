const defaultState = {
  typeSearch: '',
  text: '',
};

const searchState = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCH_FILE':
      return {
        typeSearch: action.typeSearch,
        text: action.text,
      };
    default:
      return state;
  }
};

export default searchState;
