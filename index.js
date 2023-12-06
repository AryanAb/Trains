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

wss.on("connection", (ws) => {
  WS = ws;
  ws.on("message", (data) => {
    console.log(`received: ${data}`);
  });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.put("/train_speed", (req, res) => {
  const data = req.body;
  if (WS) {
    WS.send(Buffer.from(JSON.stringify(data)));
  }
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
