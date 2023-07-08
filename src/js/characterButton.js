import { Actor, Font, Label, Vector } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemy";

export class CharacterButton extends Actor {

    engine;
    capacity;
    spriteFont;
    counter;

    constructor(capacity, spriteFont) {
        super({
            width: 24,
            height: 24
        })
        this.capacity = capacity
        this.spriteFont = spriteFont
        this.pos =  new Vector(120, 160)
    }

    onInitialize(engine) {
        this.engine = engine;
        this.graphics.use(Resources.CharacterButton.toSprite())

        let characterSprite = new Actor({
            pos: new Vector(0,0)
        })
        characterSprite.graphics.use(Resources.TilemapPacked.getSprite(1,9))
        this.addChild(characterSprite)

        this.on('pointerup', () => {this.spawnEnemy()})

        this.counter = new Label({
            text: this.capacity.toString(),
            pos: new Vector(2, -24),
            font: this.spriteFont
        })
        this.addChild(this.counter)
    }

    spawnEnemy() {
        if (this.capacity <= 0) {
            return;
        }
        let enemy = new Enemy(this.engine.currentScene.wallCollision)
        enemy.held = true
        this.engine.currentScene.add(enemy)
        this.capacity--
        this.counter.text = this.capacity.toString()
    }
}