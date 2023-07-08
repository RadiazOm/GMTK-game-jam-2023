import { Actor, Vector } from "excalibur";
import { UI } from "./UI";
import { Resources } from "./resources";
import { CharacterButton } from "./characterButton";

export class GameUI extends UI {

    engine;
    characters

    constructor(characters) {
        super()
        this.characters = characters
    }

    onInitialize(engine) {
        this.engine = engine
        let startButton = new Actor({
            pos: new Vector(0,0),
            anchor: new Vector(0,0),
            width: Resources.StartButton.width,
            height: Resources.StartButton.height
        })
        startButton.graphics.use(Resources.StartButton.toSprite())
        startButton.on('pointerup', () => {this.startGame()})
        this.addChild(startButton)


        for (let i = 0; i < this.characters; i++) {
            const characterButton = new CharacterButton(1, this.spriteFont)
            characterButton.pos = new Vector(120 + i * 50, 160)
            this.addChild(characterButton)
        }
    }

    startGame() {
        this.engine.currentScene.startGame()
    }
}