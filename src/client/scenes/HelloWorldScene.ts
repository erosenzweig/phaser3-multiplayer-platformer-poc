import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import 'regenerator-runtime/runtime'


export default class HelloWorldScene extends Phaser.Scene
{
    client!: Colyseus.Client;

	constructor()
	{
		super('hello-world')
	}

    init()
    {
        this.client = new Colyseus.Client('ws://localhost:2567');
    }

	preload()
    {
        
    }

    async create()
    {
        const room = await this.client.joinOrCreate('my_room');

        console.log(`joined room: ${room.name}`);

        room.onMessage('keydown', message => {
            console.log(`message received: ${message}`);
        });

        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (evt: KeyboardEvent) => {
            console.log(`Sending key ${evt.key} to server`);
            room.send('keydown', evt.key);
        });
    }
}
