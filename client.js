import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3000");

ws.on("message", (data) => {
  console.log(JSON.parse(data.toString()));
});
