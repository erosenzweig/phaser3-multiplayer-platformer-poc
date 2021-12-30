import Phaser from 'phaser'

import WorldScene from './scenes/World'
import PreloaderScene from './scenes/Preloader'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			fps: 60,
			gravity: { y: 300 }
		}
	},
	pixelArt: true,
	scene: [PreloaderScene, WorldScene]
}

export default new Phaser.Game(config)
