module.exports.BUTTON_TEXT = {
    MAKE_REQUEST: "Challenge",
    CANCEL_REQUEST: "Cancel Challenge",
    ACCEPT_REQUEST: "Accept Challenge",
};

module.exports.challengeStatusToButtonText = (rows, userId, BUTTON_TEXT) => {
    if (rows.length) {
        if (rows[0].sender_id == userId && !rows[0].accepted) {
            console.log("user is sender");
            return BUTTON_TEXT.CANCEL_REQUEST;
        } else if (rows[0].recipient_id == userId && !rows[0].accepted) {
            console.log("user is recipient");
            return BUTTON_TEXT.ACCEPT_REQUEST;
        }
    } else {
        console.log("no challenge is pending");
        return BUTTON_TEXT.MAKE_REQUEST;
    }
};
