import { Schema, MapSchema, Context, type } from "@colyseus/schema"
import { PlayerInput } from "./PlayerInput"

export class Player extends Schema {
    @type("string") clientId: string
    @type(PlayerInput) currentInput?: PlayerInput
  
    constructor(clientId: string)
    {
      super()
      this.clientId = clientId
      this.currentInput = new PlayerInput()
    }
  }