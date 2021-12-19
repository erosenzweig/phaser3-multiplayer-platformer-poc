import Phaser from 'phaser'

import WorldScene from './scenes/World'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	pixelArt: true,
	scene: [WorldScene]
}

export default new Phaser.Game(config)
