import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.json());
const server = createServer(app);
const wss = new WebSocketServer({ server });

const __dirname = dirname(fileURLToPath(import.meta.url));

let WS = null;
let sensors = [];

function sensor_id_to_name(id) {
  return (
    String.fromCharCode(Math.floor(id / 16) + 65) + ((id % 16) + 1).toString()
  );
}

wss.on("connection", (ws) => {
  sensors = [];
  WS = ws;
  ws.on("message", (data) => {
    try {
      var parsed = JSON.parse(data.toString());
    } catch (err) {
      console.error(err);
    }
    sensors.push(sensor_id_to_name(parsed.sensor_id));
  });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/sensors", (req, res) => {
  let html = "<ul>";
  for (const sensor of sensors) {
    html += `<li>${sensor}</li>`;
  }
  html += "</ul>";
  console.log(html);
  res.send(html);
});

app.put("/train_speed", (req, res) => {
  const data = req.body;
  if (WS) {
    WS.send(Buffer.from(JSON.stringify(data)));
  }
});

server.listen(80, () => {
  console.log("server running at port 80");
});
