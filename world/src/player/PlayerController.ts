import StateMachine from "./StateMachine";

export default class PlayerController {
    private sprite: Phaser.Physics.Matter.Sprite;
    private stateMachine: StateMachine;

    constructor(sprite: Phaser.Physics.Matter.Sprite)
    {
        this.sprite = sprite;
        this.stateMachine = new StateMachine(this, 'player')

        this.stateMachine.addState('idle');
        this.stateMachine.addState('walk');

    }
}