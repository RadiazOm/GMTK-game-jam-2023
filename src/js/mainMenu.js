import { Scene, Actor, Vector, Label, Font } from "excalibur";
import { Resources } from "./resources";
import { UI } from "./UI";

export class MainMenu extends Scene {
    constructor() {
        super()
    }

    onInitialize(engine) {
        const bg = new Actor({anchor: new Vector(0,0)})
        bg.graphics.use(Resources.Map.toSprite())
        this.add(bg)
        
        let button = new Actor({
            anchor: new Vector(0.5,0.5),
            pos: new Vector(engine.screen.drawWidth / 2,engine.screen.drawHeight / 2),
            width: Resources.StartButton.width,
            height: Resources.StartButton.height
        })
        button.graphics.use(Resources.StartButton.toSprite())

        this.add(button)
        button.on('pointerup', () => {
            engine.goToScene('level1')
        })

        let ui = new UI()

        let creditslabel = new Label({
            pos: new Vector(0, button.pos.y + 60),
            text: 'credits\nPressure, Eggy Toast, Free Music Archive\n,CC BY-NC-ND',
            font: ui.tinyFont
        })

        this.add(creditslabel)
    }
}