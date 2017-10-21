export const FolderListState = (state) => {
  //if (state.list !== {}) {
  console.log(state)
    const list = Object.keys(state.list).map(id => state.list[id]);
    return { ...state, list };
  //}
 // return [];
};


export default{};
