import axios from "./axios";

export async function receiveText() {
    const { data } = await axios.get(
        "http://dinoipsum.herokuapp.com/api/?format=json&words=10&paragraphs=3"
    );

    // console.log("data generated text in actions", data[0]);
    let arrayToString = data[0].join(" ");
    let arrayOfLetterObjects = [];

    for (let i = 0; i < arrayToString.length; i++) {
        let objectOfLetters = {
            letter: arrayToString.charAt(i),
        };
        arrayOfLetterObjects.push(objectOfLetters);
    }

    return {
        type: "RECEIVE_TEXT",
        generatedText: arrayOfLetterObjects,
        progressValue: {
            maxValue: arrayOfLetterObjects.length,
            minValue: 0,
            value: 0,
        },
    };
}

export function updateStatusColor(index, typingStatus) {
    //console.log("key in actions", index, typingStatus);
    return {
        type: "UPDATE_STATUS_COLOR",
        typingStatus: typingStatus,
        index: index,
    };
}

export function updateProgress(index) {
    //console.log("index in actions", index);
    return {
        type: "UPDATE_PROGRESS",
        index: index + 1,
    };
}

export function timerStatus(status) {
    //  console.log("timer status in actions", status);
    return {
        type: "TIMER_IS_RUNNING",
        timerStatus: status,
    };
}

export function setTotalSeconds(seconds) {
    return {
        type: "TOTAL_SECONDS",
        seconds: seconds,
    };
}

export function correctTyping() {
    return {
        type: "CORRECT_TYPING",
    };
}

export async function submitUserName(input) {
    let userName = {
        userName: input,
    };
    const { data } = await axios.post("/api/submit-user-name", userName);
    if (data.success == true) {
        return {
            type: "USER NAME",
            userName: data.userName,
        };
    }
}

export function hideRegister(value) {
    return {
        type: "HIDE REGISTER",
        hideRegister: value,
    };
}

export function receiveOnlinersList(data) {
    console.log("onliners list in action", data.data);

    return {
        type: "RECEIVE_ONLINERS_LIST",
        onlinersList: data.data,
    };
}
