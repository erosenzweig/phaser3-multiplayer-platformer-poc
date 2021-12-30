import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

export default class PreloaderScene extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Preloader)
	}

	preload()
	{
		this.load.image(TextureKeys.ForestTiles, 'Tiles/forest-tileset.png')
		this.load.image(TextureKeys.BgSky, 'Tiles/background-sky.png')
		this.load.image(TextureKeys.BgHills1, 'Tiles/background-hills1.png')
		this.load.image(TextureKeys.BgHills2, 'Tiles/background-hills2.png')
		this.load.image(TextureKeys.BgTrees, 'Tiles/background-trees.png')

		this.load.tilemapTiledJSON("forest_map", "Tiles/forest_map2.json")
	}

	create()
	{
		this.scene.start(SceneKeys.World);
	}
}
