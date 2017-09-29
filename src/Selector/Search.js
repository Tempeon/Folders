export const getSearchList = (searchState, folders, notes) => {
  switch (searchState.typeSearch) {
    case 'Name': {
      const file = notes.filter(v => v.text === searchState.text);
      const folder = folders.filter(v => v.text === searchState.text);
      return {
        file,
        folder,
        tag: [],
        types: 'Name',
      };
    }
    case 'Tag': {
      const tag = notes.filter(v => v.tags.find(t => t === searchState.text) !== undefined);
      return {
        file: [],
        folder: [],
        tag,
        types: 'Tag',
      };
    }
    case 'All': {
      const file = notes.filter(v => v.text === searchState.text);
      const folder = folders.filter(v => v.text === searchState.text);
      const tag = notes.filter(v => v.tags.find(t => t === searchState.text) !== undefined);
      return {
        file,
        folder,
        tag,
        types: 'All',
      };
    }
    default:
      return {
        file: [],
        folder: [],
        tag: [],
        types: '',
      };
  }
};

export default{};
