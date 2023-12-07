import WebSocket from "ws";

const ws = new WebSocket("http://3.80.41.52");

ws.on("message", (data) => {
  console.log(JSON.parse(data.toString()));
});
