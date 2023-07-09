import { Scene, Actor, Vector, Label, Font } from "excalibur";
import { Resources } from "./resources";
import { UI } from "./UI";
import endMusic from "../sounds/Zane_Little_Old_Tricks.mp3"

export class EndScene extends Scene {

    endMusic = new Audio(endMusic)

    constructor() {
        super()
    }

    onActivate() {
        this.endMusic.loop = true
        this.endMusic.play()
    }

    onDeactivate() {
        this.endMusic.pause()
    }

    onInitialize(engine) {
        const bg = new Actor({anchor: new Vector(0,0)})
        bg.graphics.use(Resources.Map2.toSprite())
        this.add(bg)

        
        let button = new Actor({
            anchor: new Vector(0.5,0.5),
            pos: new Vector(engine.screen.drawWidth / 2,engine.screen.drawHeight / 2),
            width: Resources.RetryButton.width,
            height: Resources.RetryButton.height
        })
        button.graphics.use(Resources.RetryButton.toSprite())

        this.add(button)
        button.on('pointerup', () => {
            engine.goToScene('level1')
        })

        let ui = new UI()

        let endLabel = new Label({
            pos: new Vector(30, button.pos.y - 60),
            text: 'Thank you for \nplaying my game!',
            font: ui.spriteFont
        })

        let creditslabel = new Label({
            pos: new Vector(0, button.pos.y + 60),
            text: 'credits\nPressure, Eggy Toast, Free Music Archive\n,CC BY-NC-ND',
            font: ui.tinyFont
        })

        this.add(creditslabel)
        this.add(endLabel)
    }
}