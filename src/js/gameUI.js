import { Actor, EasingFunctions, Vector } from "excalibur";
import { UI } from "./UI";
import { Resources } from "./resources";
import { CharacterButton } from "./characterButton";

export class GameUI extends UI {

    engine;
    characters;
    startbutton;
    characterbuttons = [];

    constructor(characters) {
        super()
        this.characters = characters
    }

    onInitialize(engine) {
        this.engine = engine
        this.startButton = new Actor({
            pos: new Vector(0,0),
            anchor: new Vector(0,0),
            width: Resources.StartButton.width,
            height: Resources.StartButton.height
        })
        this.startButton.graphics.use(Resources.StartButton.toSprite())
        this.startButton.on('pointerup', () => {this.startGame()})
        this.addChild(this.startButton)


        for (let i = 0; i < this.characters.length; i++) {
            const characterButton = new CharacterButton(1, this.spriteFont, this.characters[i])
            characterButton.pos = new Vector(120 + i * 50, 160)
            this.addChild(characterButton)
            this.characterbuttons.push(characterButton)
        }
    }

    startGame() {
        this.engine.currentScene.startGame()
        for (const characterButton of this.characterbuttons) {
            characterButton.actions.easeTo(new Vector(characterButton.pos.x, 220), 1000, EasingFunctions.EaseInOutCubic)
        }
        this.startButton.actions.easeTo(new Vector(this.startButton.pos.x, -60), 1000, EasingFunctions.EaseInOutCubic)
        Resources.ClickSound.play()
    }

    retry() {
        for (const characterButton of this.characterbuttons) {
            characterButton.actions.easeTo(new Vector(characterButton.pos.x, 160), 1000, EasingFunctions.EaseInOutCubic)
            characterButton.capacity = 1
            characterButton.counter.text = '1'
        }
        this.startButton.actions.easeTo(new Vector(this.startButton.pos.x, 0), 1000, EasingFunctions.EaseInOutCubic)
        Resources.ClickSound.play()
    }
}