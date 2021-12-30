import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  world_client?: Client;

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage("client_input", (client, message) => {
      console.log(`Got message from client ${client.sessionId}`);
      console.log(message);

      // move client based on controller input
      this.broadcast("echo", message, {except: client});
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");

    if ((options != undefined) && ("is_world_client" in options)){
      this.world_client = client;
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    if(client === this.world_client) {
      console.log("world client disconnected, something went wrong");
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}