import { ImageSource, Sound, Resource, Loader, Color, SpriteSheet} from "excalibur";
import tilemapPacked from "../images/tilemap_packed.png"
import map1 from "../images/map.png"
import fontMap from "../images/tilemap_packed_font.png"
import startButton from "../images/StartButton.png"
import characterButton from "../images/Character_pictogram.png"

const TilemapPacked = new ImageSource(tilemapPacked)
const spritesheet = SpriteSheet.fromImageSource({
  image: TilemapPacked,
  grid: {
      rows: 12,
      columns: 11,
      spriteHeight: 16,
      spriteWidth: 16
  },
});


const Resources = {
  TilemapPacked: spritesheet,
  Map: new ImageSource(map1),
  FontMap: new ImageSource(fontMap),
  StartButton: new ImageSource(startButton),
  CharacterButton: new ImageSource(characterButton),
};

const ResourceLoader = new Loader([
  TilemapPacked,
  Resources.Map,
  Resources.FontMap,
  Resources.StartButton,
  Resources.CharacterButton,
]);

ResourceLoader.backgroundColor = Color.ExcaliburBlue
ResourceLoader.loadingBarColor = Color.Black
ResourceLoader.suppressPlayButton = true

export { Resources, ResourceLoader };
