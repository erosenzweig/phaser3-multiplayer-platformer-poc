import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import 'regenerator-runtime/runtime'
import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '~/consts/SceneKeys'

export default class WorldScene extends Phaser.Scene
{
    bgSky!: Phaser.GameObjects.TileSprite
    bgHills1!: Phaser.GameObjects.TileSprite
    bgHills2!: Phaser.GameObjects.TileSprite
    bgTrees!: Phaser.GameObjects.TileSprite
	players!: Map<string, Colyseus.Client>
	ground!: Phaser.Physics.Arcade.StaticGroup
	groundZone!: Phaser.GameObjects.Zone
    map!: Phaser.Tilemaps.Tilemap

    client!: Colyseus.Client

	constructor()
	{
		super(SceneKeys.World)
	}

    init()
    {
        //this.client = new Colyseus.Client('ws://localhost:2567')
    }

	preload()
    {
        
    }

    create()
    {
        this.map = this.make.tilemap({key: "forest_map", tileWidth: 16, tileHeight: 16})
        const tileset = this.map.addTilesetImage("forest_tileset", TextureKeys.ForestTiles)
        const ground_layer = this.map.createLayer("ground_layer", tileset, 0, 0)

        // const room = await this.client.joinOrCreate('my_room', {"is_world_client": 1})

        // console.log(`joined room: ${room.name}`)

        // room.onMessage('keydown', message => {
        //     console.log(`message received: ${message}`)
        // })

        // this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (evt: KeyboardEvent) => {
        //     console.log(`Sending key ${evt.key} to server`)
        //     room.send('keydown', evt.key)
        // })
    }
}
