import Phaser from 'phaser'

import WorldScene from './scenes/World'
import PreloaderScene from './scenes/Preloader'

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 1080
const DEFAULT_WIDTH = 1920

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	physics: {
		default: 'matter',
		matter: {
			debug: true
		}
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT
	},
	pixelArt: true,
	scene: [PreloaderScene, WorldScene]
}

export default new Phaser.Game(config)
