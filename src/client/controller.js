import { GamePad } from "./gamepad";
import * as Colyseus from "colyseus.js";

var client = new Colyseus.Client("ws://localhost:2567");

client.joinOrCreate("my_room").then(room => {
  function send_input(input) {
    data = {
      ...input,
      "client_id": room.sessionId
    };

    room.send("client_input", data);
  }

  console.log(`${room.sessionId} joined ${room.name}`);

  GamePad.setup({
    canvas: "controller",
    start: {name: "start", key: "b"},
    select: {name: "select", key: "v"},
    trace: true,
    debug: true,
    hint: true,
    buttons: [
      {name: "a", "key": "d"},
      {name: "b", "key": "s"},
      {name: "x", "key": "w"},
      {name: "y", "key": "a"}
    ]
  });

  room.onMessage("echo", function(message) {
    console.log(`message received: ${message}`);
  });

  GamePad.cEvents.on("a-touchstart", function(e) {
    send_input(e);
  });
  GamePad.cEvents.on("b-touchstart", function(e) {
    send_input(e);
  });
  GamePad.cEvents.on("x-touchstart", function(e) {
    send_input(e);
  });
  GamePad.cEvents.on("y-touchstart", function(e) {
    send_input(e);
  });
  GamePad.cEvents.on("start-touchstart", function(e) {
    send_input(e);
  });
  GamePad.cEvents.on("select-touchstart", function(e) {
    send_input(e);
  });
  GamePad.cEvents.on("stick-touchmove", function(e) {
    send_input(e);
  });
}).catch(e => {
  console.log("JOIN ERROR", e);
});


