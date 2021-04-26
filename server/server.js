const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const btn = require("./getButtonText");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
const db = require("./db");
let onlineUsers = {};

app.use(compression());

app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: `pure being and pure nothing are the same.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/api/submit-user-name", (req, res) => {
    const { userName } = req.body;
    console.log(userName);
    db.insertUserName(userName)
        .then(({ rows }) => {
            //console.log(rows, rows[0].id);
            req.session.userId = rows[0].id;
            res.json({
                success: true,
                userId: rows[0].id,
                userName: userName,
            });
        })
        .catch((err) => {
            console.log("error in insertUserName", err);
            res.json({
                success: false,
            });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

/////////////////Part II in progress/////////////////////////
// socket.io
io.on("connection", (socket) => {
    // console.log(`Socker with id ${socket.id} has connected`);
    const userId = socket.request.session.userId;
    //console.log("userId in socket", userId);

    if (!userId) {
        //  console.log("no id in socket");
        return socket.disconnect(true);
    }

    onlineUsers[socket.id] = userId;
    console.log("onlineUsers in socket", onlineUsers);

    // Onliners without Challenge status
    let arrUniqueOnliners = [...new Set(Object.values(onlineUsers))];
    //console.log("arrOfIds BEFORE", arrUniqueOnliners);

    socket.on("button click", (data) => {
        console.log("button click comes in", data);
        let button = {
            otherUserId: data.otherUserId,
            currentUserId: userId,
        };

        const socketIdOtherPlayer = Object.keys(onlineUsers).filter((key) => {
            return onlineUsers[key] === data.otherUserId;
        });

        console.log("socketIdOtherPlayer", socketIdOtherPlayer[0]);

        if (data.buttonText === btn.BUTTON_TEXT.MAKE_CHALLENGE) {
            console.log("button text is", data.buttonText);
            db.makeChallenge(userId, data.otherUserId)
                .then(() => {
                    button.buttonText = btn.BUTTON_TEXT.CANCEL_CHALLENGE;
                    socket.emit("update Button", button);
                    io.to(socketIdOtherPlayer[0]).emit("get challenge", userId);
                })
                .catch((err) => {
                    console.log("error in insertChallengeRequest", err);
                });
        } else if (data.buttonText === btn.BUTTON_TEXT.ACCEPT_CHALLENGE) {
            console.log("button text is", data.buttonText);
            db.acceptChallenge()
                .then(({ rows }) => {
                    console.log("update in accept Challenge is done", rows);
                    //generate secret link
                    socket.emit("play duel");
                    console.log(socketIdOtherPlayer[0]);
                    io.to(socketIdOtherPlayer[0]).emit(
                        "challenge accepted",
                        userId
                    );
                })
                .catch((err) => {
                    console.log("error in acceptChallenge", err);
                });
        } else if (data.buttonText === btn.BUTTON_TEXT.CANCEL_CHALLENGE) {
            console.log("button text is", data.buttonText);
            db.cancelChallenge(userId, data.otherUserId)
                .then(() => {
                    button.buttonText = btn.BUTTON_TEXT.MAKE_CHALLENGE;
                    socket.emit("update Button", button);
                })
                .catch((err) => {
                    console.log("error in cancelChallenge", err);
                });
        }

        //delete otherUser with challenge status from array to not duplicate onliners
        arrUniqueOnliners = arrUniqueOnliners.filter(
            (id) => id !== data.otherPlayerId
        );
    });

    db.getChallengeStatus(userId)
        .then(({ rows }) => {
            //console.log("getChallengeStatus", rows);
            let onlinersWithChallenge = rows;

            // console.log("onlinersWithChallenge", onlinersWithChallenge);

            let arrOfIdsChallengeStatus = [];
            rows.forEach((row) => {
                arrOfIdsChallengeStatus.push(row.recipient_id);
                arrOfIdsChallengeStatus.push(row.sender_id);
            });

            //console.log("arrOfIdsChallengeStatus", arrOfIdsChallengeStatus);

            let arrOfIdsNoChallenge = arrUniqueOnliners.filter(
                (id) => !arrOfIdsChallengeStatus.includes(id)
            );
            //console.log("arrOfIdsNoChallenge", arrOfIdsNoChallenge);

            db.getOnlinePlayersByIds(arrOfIdsNoChallenge)
                .then(({ rows }) => {
                    // console.log("getOnlinePlayersByIds", rows);

                    let onliners = [...rows, ...onlinersWithChallenge];

                    //console.log("all onliners", onliners);

                    socket.emit("onliners", {
                        onliners: onliners,
                    });

                    socket.emit("current player", {
                        currentPlayer: userId,
                    });
                })
                .catch((err) => console.log("getOnlineUsersByIds", err));
        })
        .catch((err) => console.log("error in getChallengeStatus", err));

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
        // const index = arrOfIds.indexOf(socket.request.userId);
        // arrOfIds.splice(index, 1);
        io.emit("update onliners", {
            userId,
        });

        // console.log(`Socker with id ${socket.id} has disconnected`);
    });
});

// db.makeChallenge(userId, IdChallengedPlayer)
//     .then(() => {
//         const socketIdChallengedPlayer = Object.keys(
//             onlineUsers
//         ).filter((key) => {
//             return onlineUsers[key] === IdChallengedPlayer;
//         });
//         for (let i = 0; i < socketIdChallengedPlayer.length; i++) {
//             io.to(socketIdChallengedPlayer[i]).emit(
//                 "challenge request",
//                 userId
//             );
//         }
//     })
//     .catch((err) => {
//         console.log("insertChallengeRequest", err);
//     });

// const socketIdChallengedPlayer = Object.keys(
//     onlineUsers
// ).filter((key) => {
//     return onlineUsers[key] === IdChallengedPlayer;
// });
// for (let i = 0; i < socketIdChallengedPlayer.length; i++) {
//     io.to(socketIdChallengedPlayer[i]).emit(
//         "challenge request",
//         userId
//     );
// }
