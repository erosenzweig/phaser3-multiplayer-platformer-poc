import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import MessageTypes from "../../../shared/MessageTypes";
import { PlayerInputMessage } from "../types/PlayerInputMessage";

export class MyRoom extends Room<MyRoomState> {

  world_client?: Client;

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.state.worldClientConnected = false;

    this.onMessage(MessageTypes.Player_Input_Update, (client, message) => {
      console.log(`Got message from client ${client.sessionId}`);
      console.dir(message);

      if(!this.state.worldClientConnected || !this.world_client) {
        console.log("No world client connected. Ignoring player input update message")
        this.broadcast(MessageTypes.Server_No_World_Client, "No world client connected to server")
        return
      }

      this.state.currentClientInputs.set(client.sessionId, new PlayerInputMessage(
        client.sessionId,
        message.x,
        message.y,
        message.a,
        message.b,
        message.select,
        message.start,
        message.xAxis,
        message.xDir,
        message.yAxis,
        message.yDir,
        message.msgType
      ))
    });

    this.onMessage(MessageTypes.Player_Input_Update, (client, message) => {
      console.log(`Got message from client ${client.sessionId}`);
      console.dir(message);

      if(!this.state.worldClientConnected || !this.world_client) {
        console.log("No world client connected. Ignoring player input update message")
        this.broadcast(MessageTypes.Server_No_World_Client, "No world client connected to server")
        return
      }

      this.state.currentClientInputs.set(client.sessionId, new PlayerInputMessage(
        client.sessionId,
        message.x,
        message.y,
        message.a,
        message.b,
        message.select,
        message.start,
        message.xAxis,
        message.xDir,
        message.yAxis,
        message.yDir,
        message.msgType
      ))
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    if ((options != undefined) && ("is_world_client" in options)){
      this.world_client = client
      this.state.worldClientConnected = true
    } else {
      console.log("sending player_connected message to world")
      this.world_client?.send(MessageTypes.Player_Connected, { clientId: client.sessionId, msgType: MessageTypes.Player_Connected })
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    if(client === this.world_client) {
      console.log("world client disconnected");
      this.world_client = undefined
      this.state.worldClientConnected = false
      this.broadcast(MessageTypes.Server_No_World_Client)
    } else {
      console.log(`player ${client.sessionId} disconnected`)
      this.state.currentClientInputs.delete(client.sessionId)
      this.world_client?.send(MessageTypes.Player_Disconnected, {clientId: client.sessionId, msgType: MessageTypes. Player_Disconnected})
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}