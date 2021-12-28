import { MultiKey } from "../../node_modules/hud-gamepad";
import { GamePad } from "./gamepad";

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

MultiKey.setup(GamePad.events, "wasd", true );

GamePad.cEvents.on("a-touchstart", function(e) {
  console.log("a was pressed: ");
  console.log(e);
});

GamePad.cEvents.on("stick-touchmove", function(e) {
  console.log("got stick event: ");
  console.log(e);
})
