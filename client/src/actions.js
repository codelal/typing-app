import axios from "./axios";

export async function receiveText() {
    const { data } = await axios.get(
        "https://hipsum.co/api/?type=hipster-centric&sentences=2"
    );
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
