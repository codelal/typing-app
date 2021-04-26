import axios from "./axios";
import { BUTTON_TEXT } from "./buttonText";

export async function receiveText() {
    const { data } = await axios.get(
        "http://dinoipsum.herokuapp.com/api/?format=json&words=5&paragraphs=1"
    );
    //console.log(data[0]); //array of words
    let arrayToString = data[0].join(" ");
    //to string
    let arrayOfLetterObjects = [];

    //um einen array mit Objekten mit einzelnen Buchstaben zu machen

    for (let i = 0; i < arrayToString.length; i++) {
        let objectOfLetters = {
            letter: arrayToString.charAt(i),
        };

        //console.log("letter", objectOfLetters.letter);
        //Object, da typing-status später als key-value
        arrayOfLetterObjects.push(objectOfLetters);
        //console.log(arrayOfLetterObjects);
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
        location.replace("/onliners");
        return {
            type: "USER NAME",
            userName: data.userName,
        };
    }
}

export function receiveOnliners(data) {
    console.log("receiveOnliners in action", data);
    return {
        type: "RECEIVE_ONLINERS",
        onliners: data.onliners,
    };
}

export function updateButton(data) {
    console.log("updateButton in action", data);

    //If user made a challenge
    if (data.buttonText == BUTTON_TEXT.CANCEL_CHALLENGE) {
        return {
            type: "MAKE_CHALLENGE",
            otherUserId: data.otherUserId,
            currentUserId: data.currentUserId,
        };
    }

    if (data.buttonText == BUTTON_TEXT.MAKE_CHALLENGE) {
        return {
            type: "CANCEL_CHALLENGE",
            otherUserId: data.otherUserId,
            currentUserId: data.currentUserId,
        };
    }

}
