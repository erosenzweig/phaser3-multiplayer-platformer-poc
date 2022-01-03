import { GamePad } from "./gamepad";
import * as Colyseus from "colyseus.js";
import MessageTypes from "../../shared/MessageTypes";

var client = new Colyseus.Client("ws://localhost:2567");

client.joinOrCreate("my_room").then(room => {
  function send_new_input(input) {
    room.send(MessageTypes.Player_Input_Update, input)
  }

  console.log(`${room.sessionId} joined ${room.name}`);

  GamePad.setup({
    canvas: "controller",
    debug: true,
    trace: true,
    start: {name: "start", key: "b"},
    select: {name: "select", key: "v"},
    hint: true,
    buttons: [
      {name: "a", "key": "d"},
      {name: "b", "key": "s"},
      {name: "x", "key": "w"},
      {name: "y", "key": "a"}
    ]
  });
  
  room.onMessage(MessageTypes.Server_No_World_Client, function(message) {
    console.log("No world client connected to server");
  });

  room.onMessage(MessageTypes.Server_World_Client_Connected, function(messsage){
    console.log("World Client connected to server");
  });

  room.onStateChange((state) => {
    console.log("state changed: ");
    console.log(state);
  });

  var gamepadButtonEvents = [
    "a-touchstart",
    "a-touchend",
    "b-touchstart",
    "b-touchend",
    "x-touchstart",
    "x-touchend",
    "y-touchstart",
    "y-touchend",
    "start-touchstart",
    "start-touchend",
    "select-touchstart",
    "select-touchend",
    "stick-touchmove"
  ]

  gamepadButtonEvents.forEach(ev => {
    GamePad.cEvents.on(ev, e => {
      send_new_input(e);
    });
  });
}).catch(e => {
  console.log("JOIN ERROR", e);
});