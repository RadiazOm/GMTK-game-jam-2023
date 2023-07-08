import { Actor, Vector, CollisionType } from "excalibur";
import { Enemy } from "./enemy";

export class WallCollision extends Actor {

    compositeCollider
    legalPos = true

    constructor(compositeCollider) {
        super()
        this.compositeCollider = compositeCollider
    }

    onInitialize() {
        this.pos = new Vector(0,0)
        this.body.collisionType = CollisionType.Fixed
        this.collider.useCompositeCollider(this.compositeCollider.getColliders())

        this.on('collisionstart', (event) => {this.onCollisionStart(event)})
        this.on('collisionend', (event) => {this.onCollisionEnd(event)})
    }

    onCollisionStart(event) {
        if (event.other instanceof Enemy) {
            this.legalPos = false
        }
    }

    onCollisionEnd(event) {
        if (event.other instanceof Enemy) {
            this.legalPos = true
        }
    }
}