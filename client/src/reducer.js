export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_TEXT") {
        state = {
            ...state,
            generatedText: action.generatedText,
            progressValue: action.progressValue,
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

    if (action.type == "UPDATE_PROGRESS") {
        state = {
            ...state,
            progressValue: {
                ...state.progressValue,
                value: action.index,
            },
        };
    }

    if (action.type == "SET_TIMER") {
        state = {
            ...state,
            timer: action.timer,
        };
    }
    return state;
}
