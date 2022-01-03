import AnimiationKeys from "~/consts/AnimationKeys"
import { PlayerInput } from "~/types/PlayerInput"

export default class Player {
    sprite: Phaser.Physics.Matter.Sprite
    doubleJumpCounter: number
    playerIsGrounded: boolean
    speed: number
    jumpForce: number
    jumpJustPressed: boolean
    clientId: string
    input?: PlayerInput
    
    constructor(sprite: Phaser.Physics.Matter.Sprite, clientId)
    {
        this.clientId = clientId
        this.sprite = sprite
        this.speed = 3
        this.jumpForce = -6
        this.doubleJumpCounter = 1
        this.playerIsGrounded = false
        this.jumpJustPressed = false
    }

    setInput(newInput: PlayerInput)
    {
        if(!this.input)
        {
            if(newInput.a == 1) {
                console.log()
                this.jumpJustPressed = true
            }
            else 
                this.jumpJustPressed = false
        }
        else {
            this.jumpJustPressed = (this.input.a == 0 && newInput.a == 1) ? true : false
            console.log(`jumpJustPressed ${this.jumpJustPressed}`)
        }

        this.input = newInput
    }

    updatePlayer()
    {
        if(!this.input)
            return
        
        if(this.jumpJustPressed && this.playerIsGrounded)
        {
            this.sprite.setVelocityY(this.jumpForce)
            this.sprite.play(AnimiationKeys.Player_Jump, true)
            this.playerIsGrounded = false
        }
        else if(this.jumpJustPressed && this.doubleJumpCounter > 0 && !this.playerIsGrounded)
        {
            this.sprite.setVelocityY(this.jumpForce * 1.1)
            this.sprite.play(AnimiationKeys.Player_DoubleJump, true)
            this.doubleJumpCounter -= 1
        }
        else if(this.input.xDir == -1)
        {
            this.sprite.setVelocityX(-this.speed)
            this.sprite.flipX = true

            if(this.playerIsGrounded)
                this.sprite.play(AnimiationKeys.Player_Run, true)
        }
        else if(this.input.xDir == 1)
        {
            this.sprite.setVelocityX(this.speed)
            this.sprite.flipX = false
            
            if(this.playerIsGrounded)
                this.sprite.play(AnimiationKeys.Player_Run, true)
        }
        else if(this.playerIsGrounded) {
            if(this.sprite.anims.currentAnim.key === AnimiationKeys.Player_Jump || this.sprite.anims.currentAnim.key === AnimiationKeys.Player_DoubleJump)
                this.sprite.playAfterRepeat(AnimiationKeys.Player_Idle)
            else
                this.sprite.play(AnimiationKeys.Player_Idle)

            this.doubleJumpCounter = 1
            this.playerIsGrounded = true
        }
    }
}