import axios from "./axios";
import { BUTTON_TEXT } from "./ChallengeOthers";

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
        location.replace("/challenge-others");
        return {
            type: "USER NAME",
            userName: data.userName,
        };
    }
}

export function receiveOnlinersNoChallenge(data) {
    //console.log("receiveOnlinersNoStatus in action", data);
    return {
        type: "RECEIVE_ONLINERS_NO_CHALLENGE",
        onlinersNoChallenge: data.onlinersNoChallenge,
    };
}

export function receiveOnlinersWithChallenge(data) {
    //console.log("receiveOnlinersWithStatus in action", data);
    return {
        type: "RECEIVE_ONLINERS_WITH_CHALLENGE",
        onlinersWithChallenge: data.onlinersWithChallenge,
    };
}

export function updateButton(data) {
    console.log("updateButton in action", data);

    if (data.buttonText == BUTTON_TEXT.CANCEL_CHALLENGE) {
        return {
            type: "ACCEPT_CHALLENGE",
            otherUserId: data.otherUserId,
        };
    }

    if (data.buttonText == BUTTON_TEXT.MAKE_CHALLENGE) {
        return {
            type: "CANCEL_CHALLENGE",
            otherUserId: data.otherUserId,
        };
    }
}

