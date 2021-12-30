import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import 'regenerator-runtime/runtime'
import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '~/consts/SceneKeys'
import AnimiationKeys from '~/consts/AnimationKeys'

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

    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    debugPlayer!: Phaser.Physics.Matter.Sprite
    doubleJumpCounter!: number
    playerIsJumping!: boolean
    playerIsGrounded!: boolean

	constructor()
	{
		super(SceneKeys.World)
	}

    init()
    {
        //this.client = new Colyseus.Client('ws://localhost:2567')
        this.cursors = this.input.keyboard.createCursorKeys()
        this.playerIsGrounded = false
        this.playerIsJumping = false
        this.doubleJumpCounter = 1
    }

	preload()
    {
        
    }

    create()
    {
        // Animated Tilemaps Reference
        // https://phaser.discourse.group/t/how-to-show-tilemap-animated-tiles-in-phaser-game/9972/2

        this.map = this.make.tilemap({key: "forest_map", tileWidth: 16, tileHeight: 16})
        const tileset = this.map.addTilesetImage("forest_tileset", TextureKeys.ForestTiles)
        const groundLayer = this.map.createLayer("ground_layer", tileset, 0, 0)
        const objectsLayer = this.map.getObjectLayer("objects")

        groundLayer.setCollisionByProperty({collidable: true})

        this.matter.world.convertTilemapLayer(groundLayer)

        this.createPlayerAnims()

        objectsLayer.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0 } = objData

            if(name == "player-spawn")
            {
                this.debugPlayer = this.matter.add.sprite(x + (width * 0.5), y, AnimiationKeys.Player_Idle).play(AnimiationKeys.Player_Idle).setFixedRotation()

                this.debugPlayer.setOnCollide((data: MatterJS.ICollisionPair) => {
                    this.playerIsGrounded = true
                })
            }
        })

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

    update(time: number, delta: number): void {
        this.updatePlayer()
    }

    updatePlayer()
    {
        if(!this.debugPlayer)
            return

        const speed = 3
        const jumpForce = -6

        const jumpJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

        if(jumpJustPressed && this.playerIsGrounded)
        {
            this.debugPlayer.setVelocityY(jumpForce)
            this.debugPlayer.play(AnimiationKeys.Player_Jump, true)
            this.playerIsGrounded = false
        }
        else if(jumpJustPressed && this.doubleJumpCounter > 0 && !this.playerIsGrounded)
        {
            this.debugPlayer.setVelocityY(jumpForce * 1.1)
            this.debugPlayer.play(AnimiationKeys.Player_DoubleJump, true)
            this.doubleJumpCounter -= 1
        }
        else if(this.cursors.left.isDown)
        {
            this.debugPlayer.setVelocityX(-speed)
            this.debugPlayer.flipX = true

            if(this.playerIsGrounded)
                this.debugPlayer.play(AnimiationKeys.Player_Run, true)
        }
        else if(this.cursors.right.isDown)
        {
            this.debugPlayer.setVelocityX(speed)
            this.debugPlayer.flipX = false
            
            if(this.playerIsGrounded)
                this.debugPlayer.play(AnimiationKeys.Player_Run, true)
        }
        else if(this.playerIsGrounded) {
            if(this.debugPlayer.anims.currentAnim.key === AnimiationKeys.Player_Jump || this.debugPlayer.anims.currentAnim.key === AnimiationKeys.Player_DoubleJump)
                this.debugPlayer.playAfterRepeat(AnimiationKeys.Player_Idle)
            else
                this.debugPlayer.play(AnimiationKeys.Player_Idle)

            this.doubleJumpCounter = 1
            this.playerIsGrounded = true
            this.playerIsJumping = false
        }
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
}
