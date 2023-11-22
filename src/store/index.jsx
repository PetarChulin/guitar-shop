import { legacy_createStore } from "redux";



function searchFieldReducer(state = { inputValue: '', filteredNames: [] }, action) {
    switch (action.type) {
        case 'searched-string':
            return { inputValue: action.payload };
        case 'UPDATE_FILTERED_NAMES':
            return { filteredNames: action.payload };
        default:
            return state;
    }
}

export const updateInputValue = (value) => ({
    type: 'searched-string',
    payload: value
});

export const updateInputValueRedux = (value) => ({
    type: 'UPDATE_INPUT_VALUE_REDUX',
    payload: value
});



const store = legacy_createStore(searchFieldReducer);

export default store;