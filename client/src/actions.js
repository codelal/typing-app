import axios from "./axios";

export async function receiveText() {
    const { data } = await axios.get(
        "https://hipsum.co/api/?type=hipster-centric&sentences=2"
    );
    //Change API later because API returns smt the same text
    // console.log("data generated text in actions", data[0].charAt(0));

    let arrayOfLetterObjects = [];

    for (let i = 0; i < data[0].length; i++) {
        let objectOfLetters = {
            letter: data[0].charAt(i),
        };
        arrayOfLetterObjects.push(objectOfLetters);
    }

    //console.log("arrayOfLetterObjects", arrayOfLetterObjects);

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
    console.log("key in actions", index, typingStatus);
    return {
        type: "UPDATE_STATUS_COLOR",
        typingStatus: typingStatus,
        index: index,
    };
}

export function updateProgress(index) {
    console.log("index in actions", index);
    return {
        type: "UPDATE_PROGRESS",
        index: index,
    };
}
