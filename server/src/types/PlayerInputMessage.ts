
import { Schema, MapSchema, Context, type } from "@colyseus/schema"

export class PlayerInputMessage extends Schema{
    @type("number") x: number
    @type("number") y: number
    @type("number") a: number
    @type("number") b: number
    @type("number") select: number
    @type("number") start: number
    @type("number") xAxis: number
    @type("number") xDir: number
    @type("number") yAxis: number
    @type("number") yDir: number
    @type("string") msgType: string
    @type("string") clientId: string
  
    constructor(
        clientId: string,
        x?: number,
        y?: number,
        a?: number,
        b?: number,
        select?: number,
        start?: number,
        xAxis?: number,
        xDir?: number,
        yAxis?: number,
        yDir?: number,
        msgType?: string
    ) {
      super()
      this.clientId = clientId
      this.x = x || 0
      this.y = y || 0
      this.a = a || 0
      this.b = b || 0
      this.select = select || 0
      this.start = start || 0
      this.xAxis = xAxis || 0
      this.xDir = xDir || 0
      this.yAxis = yAxis || 0
      this.yDir = yDir || 0
      this.msgType = msgType || ""
    }
  }