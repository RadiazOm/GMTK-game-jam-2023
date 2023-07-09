import { Actor, Vector } from "excalibur";
import { Resources } from "../resources";

export class Projectile extends Actor {

    direction
    position
    health = 1
    attack

    constructor(position, direction, attackPower) {
        super({
            width: 5,
            height: 5
        })
        this.direction = direction
        this.position = position
        this.attack = attackPower
    }

    onInitialize() {
        this.graphics.use(Resources.TilemapPacked.getSprite(0,11))
        this.pos = this.position
        let normalizedDirection = this.direction.normalize()
        this.vel = new Vector(-normalizedDirection.x * 20, -normalizedDirection.y * 20)
    }
}