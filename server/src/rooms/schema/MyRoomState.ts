import { Schema, MapSchema, Context, type } from "@colyseus/schema"
import { Player } from "../../types/Player"


export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>()
}