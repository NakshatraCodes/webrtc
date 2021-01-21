const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);
const { nanoid } = require("nanoid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${nanoid(5)}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomID: req.params.room });
});

//  Socket Events

io.on("connection", (socket) => {
  socket.on("join-room", (roomID, userID) => {
    console.log(roomID, userID);
    socket.join(roomID);
    socket.to(roomID).broadcast.emit("user-connected", userID);
  });
});
server.listen(3000);
