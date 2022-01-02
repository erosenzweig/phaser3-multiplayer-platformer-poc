import { Schema, MapSchema, Context, type } from "@colyseus/schema"
import { PlayerInputMessage } from "../../types/PlayerInputMessage"


export class MyRoomState extends Schema {
  @type("boolean") worldClientConnected: boolean = false
  @type({ map: PlayerInputMessage }) currentClientInputs = new MapSchema<PlayerInputMessage>()
}