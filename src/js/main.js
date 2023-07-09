import { Engine, DisplayMode, Physics } from "excalibur";
import { ResourceLoader } from "./resources";
import { Level } from "./level";
import { Level2 } from "./level2";

export class Game extends Engine {
    constructor() {
        super({
            width: 320,
            height: 180,
            maxFps: 144,
            displayMode: DisplayMode.FitScreen,
        })
        this.showDebug(false)
        this.setAntialiasing(false)
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.addScene('level1', new Level())
        this.addScene('level2', new Level2())

        this.goToScene('level2')
    }
}

new Game()