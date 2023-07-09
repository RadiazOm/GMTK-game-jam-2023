import { ImageSource, Sound, Resource, Loader, Color, SpriteSheet} from "excalibur";
import tilemapPacked from "../images/tilemap_packed.png"
import map1 from "../images/map.png"
import map2 from "../images/map2.png"
import fontMap from "../images/tilemap_packed_font.png"
import tinyfontMap from "../images/tinyfont.png"
import startButton from "../images/StartButton.png"
import retryButton from "../images/RetryButton.png"
import nextButton from "../images/NextButton.png"
import characterButton from "../images/Character_pictogram.png"

import hitsound from "../sounds/hitHurt.wav"
import pickupsound from "../sounds/pickup.wav"
import dropsound from "../sounds/drop.wav"
import clicksound from "../sounds/blipSelect.wav"


const TilemapPacked = new ImageSource(tilemapPacked)
const spritesheet = SpriteSheet.fromImageSource({
  image: TilemapPacked,
  grid: {
      rows: 13,
      columns: 11,
      spriteHeight: 16,
      spriteWidth: 16
  },
});


const Resources = {
  TilemapPacked: spritesheet,
  Map: new ImageSource(map1),
  Map2: new ImageSource(map2),
  FontMap: new ImageSource(fontMap),
  TinyFont: new ImageSource(tinyfontMap),
  StartButton: new ImageSource(startButton),
  RetryButton: new ImageSource(retryButton),
  NextButton: new ImageSource(nextButton),
  CharacterButton: new ImageSource(characterButton),

  HitSound: new Sound(hitsound),
  DropSound: new Sound(dropsound),
  PickupSound: new Sound(pickupsound),
  ClickSound: new Sound(clicksound),
};

const ResourceLoader = new Loader([
  TilemapPacked,
  Resources.Map,
  Resources.Map2,
  Resources.FontMap,
  Resources.TinyFont,
  Resources.StartButton,
  Resources.RetryButton,
  Resources.NextButton,
  Resources.CharacterButton,

  Resources.HitSound,
  Resources.DropSound,
  Resources.PickupSound,
  Resources.ClickSound,
]);

ResourceLoader.backgroundColor = Color.ExcaliburBlue
ResourceLoader.loadingBarColor = Color.Black
ResourceLoader.suppressPlayButton = true

export { Resources, ResourceLoader };
