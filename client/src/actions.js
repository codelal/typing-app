import axios from "./axios";

export async function receiveText() {
    const { data } = await axios.get(
        "https://hipsum.co/api/?type=hipster-centric&sentences=2"
    );
    console.log("data generated text in actions", data[0]);

    return {
        type: "RECEIVE_TEXT",
        generatedText: data[0],
    };
}
