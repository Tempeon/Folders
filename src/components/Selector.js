/**
 * Created by Shesha on 24.06.2017.
 */

const getSearchList = () => {

    /*
    if (action.typeSearch === 'Name') {
        const file = action.notes.filter(v => v.text === action.text);
        const folder = action.folders.filter(v => v.text === action.text);
        state.push(folder, file)
        console.log(state)
        return {
            tag: [],
            file,
            folder
        };
    } else if (action.typeSearch === 'Tag') {
        const filters = action.notes.filter(v => v.tags.find(t => t === action.text) !== undefined);
        return state.concat(filters);
    } else if (action.typeSearch === 'All') {
        const file = action.notes.filter(v => v.text === action.text);
        const folder = action.folders.filter(v => v.text === action.text);
        const tag = action.notes.filter(v => v.tags.find(t => t === action.text) !== undefined);
        return state.concat(folder, file, tag);
    }
    return state;*/
};

export default getSearchList;
