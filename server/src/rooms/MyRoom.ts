import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import MessageTypes from "../../../shared/MessageTypes";

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

      // Send controller data from client to world renderer
      this.world_client.send(MessageTypes.Player_Input_Update, message)
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    if ((options != undefined) && ("is_world_client" in options)){
      this.world_client = client
      this.state.worldClientConnected = true
      
      var self = this
      
      this.clients.forEach(function(client){
        self.world_client?.send(MessageTypes.Player_Connected, {clientId: client.sessionId})
      })
    } else {
      this.world_client?.send(MessageTypes.Player_Connected, { clientId: client.sessionId })
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    if(client === this.world_client) {
      console.log("world client disconnected");
      this.world_client = undefined
      this.state.worldClientConnected = false
      this.broadcast(MessageTypes.Server_No_World_Client)
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}