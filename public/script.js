// UI Reference
const videoGrid = document.getElementById("video-grid");

const socket = io("/");
const myPeer = new Peer(undefined, {
  host: "localhost",
  port: "3001",
  path: "/",
});

const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on("call", (call) => {
      call.answer(stream);
    });

    socket.on("user-connected", (userID) => {
      connectToNewUser(userID, stream);
      console.log("User was connected");
    });
  });

myPeer.on("open", (id) => {
  socket.emit("join-room", room_id, id);
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

function connectToNewUser(userID, stream) {
  console.log("connecting to new user");
  const call = myPeer.call(userID, stream);
  call.on("stream", (userVideoStream) => {
    console.log("Got stream");
    addVideoStream(document.createElement("video"), userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });
}
