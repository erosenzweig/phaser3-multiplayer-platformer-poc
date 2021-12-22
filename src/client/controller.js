import { GamePad, MultiKey} from "../../node_modules/hud-gamepad";

GamePad.setup({
    canvas:"controller",
    start:{name:"start", key:"b"},
    select:{name:"select", key:"v"},
    trace:true,
    debug:true,
    hint:true,
    buttons:[
      {name:"a", "key":"d"},
      {name:"b", "key":"s"},
      {name:"x", "key":"w"},
      {name:"y", "key":"a"}
    ]
});

MultiKey.setup(GamePad.events, "wasdbv", true );



