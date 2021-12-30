import { Server } from "colyseus";
import { createServer } from "http";
import { monitor } from "@colyseus/monitor";
import express from "express";
import cors from 'cors';
import { MyRoom } from "./rooms/MyRoom";

const app = express();
const port = Number(process.env.port) || 2567;

app.use(cors());
app.use(express.json());
app.use("/colyseus", monitor());

app.get("/", (req, res) => {
    res.send("It's time to kick ass and chew bubblegum!");
});

const gameServer = new Server({
  server: createServer(app)
});

gameServer.define('my_room', MyRoom);

console.log(`listening on port ${port}`);
gameServer.listen(port);