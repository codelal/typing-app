export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_TEXT") {
        state = {
            ...state,
            generatedText: action.generatedText,
        };
    }

    if (action.type == "UPDATE_STATUS_COLOR") {
        state = {
            ...state,
            generatedText: state.generatedText.map((letterObject, index) => {
                if (index == action.index) {
                    return {
                        ...letterObject,
                        typingStatus: action.typingStatus,
                    };
                } else {
                    return letterObject;
                }
            }),
        };
    }
    return state;
}
