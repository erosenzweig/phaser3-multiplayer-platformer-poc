import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import AnimiationKeys from '~/consts/AnimationKeys'

export default class PreloaderScene extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Preloader)
	}

	preload()
	{
		// Background
		this.load.image(TextureKeys.ForestTiles, 'Tiles/forest-tileset.png')
		this.load.image(TextureKeys.BgSky, 'Tiles/background-sky.png')
		this.load.image(TextureKeys.BgHills1, 'Tiles/background-hills1.png')
		this.load.image(TextureKeys.BgHills2, 'Tiles/background-hills2.png')
		this.load.image(TextureKeys.BgTrees, 'Tiles/background-trees.png')

		// Tileset
		this.load.tilemapTiledJSON("forest_map", "Tiles/forest_map2.json")

		// Player Animations
		this.load.spritesheet(AnimiationKeys.Player_Idle, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@idle-sheet.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet(AnimiationKeys.Player_Run, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@run-sheet.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet(AnimiationKeys.Player_Jump, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@jump-sheet.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet(AnimiationKeys.Player_DoubleJump, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@double-jump-sheet.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet(AnimiationKeys.Player_Hurt, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@hurt-sheet.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet(AnimiationKeys.Player_Climb, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@climb-sheet.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet(AnimiationKeys.Player_Attack, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@attack-sheet.png", {frameWidth: 64, frameHeight: 64})
		this.load.spritesheet(AnimiationKeys.Player_WallSlide, "CharacterAnimations/Main-Character/Sprite-Sheets/main-character@wall-slide-sheet.png", {frameWidth: 64, frameHeight: 64})
	}

	create()
	{
		this.scene.start(SceneKeys.World);
	}
}
