const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
const db = require("./db");
let onlineUsers = {};

app.use(compression());

// app.use(
//     express.urlencoded({
//         extended: false,
//     })
// );

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
            console.log(rows, rows[0].id);
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

// app.get("/register", (req, res) => {
//     console.log("welcome in server");
//     if (req.session.userId) {
//         console.log("cookie", req.session.userId);
//         res.redirect("/");
//     } else {
//         console.log("no cookie", req.session.userId);
//         //res.sendFile(path.join(__dirname, "..", "client", "index.html"));
//         res.redirect("/register");
//     }
// });

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

// socket.io
io.on("connection", (socket) => {
    console.log(`Socker with id ${socket.id} has connected`);
    const userId = socket.request.session.userId;
    //const userId = socket.request.session.userId;
    if (!userId) {
        return socket.disconnect(true);
    }

    onlineUsers[socket.id] = userId;

    let arrOfIds = [...new Set(Object.values(onlineUsers))];

    db.getOnlinePlayersByIds(arrOfIds)
        .then(({ rows }) => {
            // console.log("getOnlineUsersByIds", rows);
            io.sockets.emit("online users", {
                data: rows,
            });
        })
        .catch((err) => console.log("getOnlineUsersByIds", err));

    socket.on("challenge player", (id) => {
        console.log("id in socket server", id);
    });
    // socket.on("user disconnect", () => {
    //     delete onlineUsers[socket.id];
    // });

    socket.on("Disconnect", () => {
        console.log(`Socker with id ${socket.id} has disconnected`);
    });
});
