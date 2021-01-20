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

server.listen(3000);
