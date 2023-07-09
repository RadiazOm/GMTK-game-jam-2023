import { Actor, Font, Label, Vector } from "excalibur";
import { Resources } from "./resources";
import { Enemy } from "./enemies/enemy"
import { Orc } from "./enemies/orcEnemy";
import { Crab } from "./enemies/crabEnemy";

export class CharacterButton extends Actor {

    engine;
    capacity;
    spriteFont;
    counter;
    character;

    constructor(capacity, spriteFont, character) {
        super({
            width: 24,
            height: 24
        })
        this.capacity = capacity
        this.spriteFont = spriteFont
        this.character = character
        this.pos =  new Vector(120, 160)
    }

    onInitialize(engine) {
        this.engine = engine;
        this.graphics.use(Resources.CharacterButton.toSprite())

        let characterSprite = new Actor({
            pos: new Vector(0,0)
        })

        const characterVector = this.getCharacterSprite(this.character)
        characterSprite.graphics.use(Resources.TilemapPacked.getSprite(characterVector.x, characterVector.y))
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
        if (this.capacity <= 0 || this.engine.currentScene.start == true) {
            return;
        }
        let enemy = this.getCharacterInstance(this.character)
        console.log(enemy)
        enemy.held = true
        this.engine.currentScene.add(enemy)
        this.capacity--
        this.counter.text = this.capacity.toString()
        this.engine.currentScene.enemies.push(enemy)
    }

    getCharacterSprite(enemy) {
        switch (enemy) {
            case 'crab':
                return new Vector(2,9)
            case 'orc':
                return new Vector(1,9)
            default:
                return new Vector(1,9)
        }
    }

    getCharacterInstance(enemy) {
        switch (enemy) {
            case 'crab':
                return new Crab(this.engine.currentScene.wallCollision)
            case 'orc':
                return new Orc(this.engine.currentScene.wallCollision)
            default:
                return new Enemy(this.engine.currentScene.wallCollision)
        }
    }
}