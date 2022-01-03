import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { Player } from "../types/Player";
import MessageTypes from "../../../shared/MessageTypes";
import { PlayerInput } from "../types/PlayerInput";


export class MyRoom extends Room<MyRoomState> {

  world_client?: Client;

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.onMessage(MessageTypes.Player_Input_Update, (client: Client, message: any) => {
      console.log(`Received new player input for ${client.sessionId}. Updating player state.`)
      console.log(message)

      let player = this.state.players.get(client.sessionId)

      if(!player) {
        console.log(`No player with id ${client.sessionId} found. Message will be ignored`)
        return
      }

      player.currentInput = new PlayerInput(
        message["x"],
        message["y"],
        message["a"],
        message["b"],
        message["select"],
        message["start"],
        message["xAxis"],
        message["xDir"],
        message["yAxis"],
        message["yDir"]
      )
    })
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    if ((options != undefined) && ("is_world_client" in options)){
      this.world_client = client
    } else {
      console.log(`New player ${client.sessionId} connected. Adding new player to game state`)
      this.state.players.set(client.sessionId, new Player(client.sessionId))
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    if(client === this.world_client) {
      this.world_client = undefined
      this.broadcast(MessageTypes.Server_No_World_Client)
    }
   
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...")
  }
}