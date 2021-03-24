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

    if (action.type == "TIMER_IS_RUNNING") {
        state = {
            ...state,
            timerStatus: action.timerStatus,
        };
    }

    if (action.type == "TOTAL_SECONDS") {
        state = {
            ...state,
            seconds: action.seconds,
        };
    }

    if (action.type == "CORRECT_TYPING") {
        // state = {
        //     ...state,
        //     correctTyping: ...state.correctTyping + 1
        // };
    }

    if (action.type == "USER NAME") {
        state = {
            ...state,
            userName: action.userName,
        };
    }

    if (action.type == "RECEIVE_ONLINERS_LIST") {
        state = {
            ...state,
            onlinersList: action.onlinersList,
        };
    }

    return state;
}
