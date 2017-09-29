export const FolderListState = (state) => {
  //if (state.list !== {}) {
    const list = Object.keys(state.list).map(id => state.list[id]);
    return { ...state, list };
  //}
 // return [];
};


export default{};
