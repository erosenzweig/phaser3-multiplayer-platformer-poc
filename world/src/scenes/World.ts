import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import 'regenerator-runtime/runtime'
import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '~/consts/SceneKeys'
import AnimiationKeys from '~/consts/AnimationKeys'
import Player from '~/player/Player'
import { PlayerInput } from '../types/PlayerInput'

export default class WorldScene extends Phaser.Scene
{
    bgSky!: Phaser.GameObjects.TileSprite
    bgHills1!: Phaser.GameObjects.TileSprite
    bgHills2!: Phaser.GameObjects.TileSprite
    bgTrees!: Phaser.GameObjects.TileSprite
	players!: Map<string, Player>
	ground!: Phaser.Physics.Arcade.StaticGroup
	groundZone!: Phaser.GameObjects.Zone
    map!: Phaser.Tilemaps.Tilemap
    
    client!: Colyseus.Client
    room!: Colyseus.Room

    player_spawn_point?: Phaser.Types.Tilemaps.TiledObject
    
	constructor()
	{
		super(SceneKeys.World)
	}

    init()
    {
        this.client = new Colyseus.Client('ws://localhost:2567')
    }

	preload()
    {
        
    }

    async create()
    {
        this.players = new Map<string, Player>();

        // Colyseus
        // Connect this client world renderer to Colyseus game server
        this.room = await this.client.joinOrCreate('my_room', {"is_world_client": 1})

        console.log(`joined room: ${this.room.name}`)

        // register MessageTypes. used for client connect and disconnect
        this.room.onStateChange(this.handleStateChange.bind(this))

        this.map = this.make.tilemap({key: "forest_map", tileWidth: 16, tileHeight: 16})
        const tileset = this.map.addTilesetImage("forest_tileset", TextureKeys.ForestTiles)
        const groundLayer = this.map.createLayer("ground_layer", tileset, 0, 0)
        const objectsLayer = this.map.getObjectLayer("objects")

        groundLayer.setCollisionByProperty({collidable: true})

        this.matter.world.convertTilemapLayer(groundLayer)

        // save important object points from tilemap
        objectsLayer.objects.forEach(objData => {
            const { name } = objData

            if(name == "player-spawn") {
                console.log("setting player_spawn_point")
                console.log(objData)
                this.player_spawn_point = objData
            }
        }, this)

        // Animations
        // Load player animations into scene 
        this.createPlayerAnims()

        // // register handler for statechanges. used for client input
        // this.room.onStateChange(this.handleStateChange.bind(this))

        // Tilemaps / World 
        // Animated Tilemaps Reference
        // https://phaser.discourse.group/t/how-to-show-tilemap-animated-tiles-in-phaser-game/9972/2
        
    }

    update(time: number, delta: number): void {
        this.players.forEach((player: Player) => {
            player.updatePlayer()
        })
    }

    createNewPlayerSprite(clientId: string)
    {
        // create new player sprite
        var playerSprite = this.matter.add.sprite((this.player_spawn_point?.x || 0) + ((this.player_spawn_point?.width || 0) * 0.5), (this.player_spawn_point?.y || 0), AnimiationKeys.Player_Idle).play(AnimiationKeys.Player_Idle).setFixedRotation()
        
        // tag sprite with client ID for references in collisions 
        playerSprite.clientId = clientId

        // set collisions
        playerSprite.setOnCollide((data: MatterJS.ICollisionPair) => {
            if(data.bodyA.gameObject.clientId) {
                const collisionPlayer = this.players.get(data.bodyA.gameObject.clientId)
                if(collisionPlayer) {
                    collisionPlayer.playerIsGrounded = true
                }
            }
            else if(data.bodyB.gameObject.clientId) {
                const collisionPlayer = this.players.get(data.bodyB.gameObject.clientId)
                if(collisionPlayer) {
                    collisionPlayer.playerIsGrounded = true
                }
            }
        })

        return playerSprite
    }

    createPlayerAnims()
    {
        this.anims.create({
            key: AnimiationKeys.Player_Idle,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_Idle, {start: 0, end: 23}),
            frameRate: 12,
            repeat: -1
        })
        
        this.anims.create({
            key: AnimiationKeys.Player_Run,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_Run, {start: 0, end: 9}),
            frameRate: 12,
            repeat: -1
        })
        
        this.anims.create({
            key: AnimiationKeys.Player_Jump,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_Jump, {start: 0, end: 12}),
            frameRate: 20
        })
        
        this.anims.create({
            key: AnimiationKeys.Player_DoubleJump,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_DoubleJump, {start: 0, end: 20}),
            frameRate: 32
        })
        
        this.anims.create({
            key: AnimiationKeys.Player_Hurt,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_Hurt, {start: 0, end: 7}),
            frameRate: 12
        })
        
        this.anims.create({
            key: AnimiationKeys.Player_Climb,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_Climb, {start: 0, end: 11}),
            frameRate: 12,
            repeat: -1
        })
        
        this.anims.create({
            key: AnimiationKeys.Player_Attack,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_Attack, {start: 0, end: 7}),
            frameRate: 12
        })
        
        this.anims.create({
            key: AnimiationKeys.Player_WallSlide,
            frames: this.anims.generateFrameNames(AnimiationKeys.Player_WallSlide, {start: 0, end: 5}),
            frameRate: 12,
            repeat: -1
        })
    }

    handleStateChange(state: any)
    {
        if(!state.players)
            return
        
        // handle player disconnect
        this.players.forEach(p => {
            if(!state.players.get(p.clientId)) {
                console.log(`client ${p.clientId} disconnected. deleting.`)
                const player = this.players.get(p.clientId)
                player?.sprite.destroy()
                this.players.delete(p.clientId)
            }
        })
        
        // update existing player input if exists, 
        // otherwise create new player and add to game world
        state.players.forEach(playerMap => {
            const player = this.players.get(playerMap.clientId)
            if (player) {
                // player already exists, update input
                console.log(`updating input for player ${playerMap.clientId}`)
                player.setInput(new PlayerInput(
                    playerMap.currentInput.x,
                    playerMap.currentInput.y,
                    playerMap.currentInput.a,
                    playerMap.currentInput.b,
                    playerMap.currentInput.select,
                    playerMap.currentInput.start,
                    playerMap.currentInput.xAxis,
                    playerMap.currentInput.xDir,
                    playerMap.currentInput.yAxis,
                    playerMap.currentInput.yDir
                ))
            } else {
                const newPlayer = new Player(
                    this.createNewPlayerSprite(playerMap.clientId),
                    playerMap.clientId
                )

                this.players.set(playerMap.clientId, newPlayer)
            }
        });
    }
}
