export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_TEXT") {
        state = {
            ...state,
            generatedText: action.generatedText,
        };
        return state;
    }
}
