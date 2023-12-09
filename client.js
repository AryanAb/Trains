import WebSocket from "ws";

const ws = new WebSocket("http://54.227.160.71");

ws.on("message", (data) => {
  console.log(JSON.parse(data.toString()));
});
