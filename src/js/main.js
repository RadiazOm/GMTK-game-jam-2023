import { Engine, DisplayMode, Physics } from "excalibur";
import { ResourceLoader } from "./resources";
import { Level } from "./level";

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
        this.addScene('level', new Level())

        this.goToScene('level')
    }
}

new Game()