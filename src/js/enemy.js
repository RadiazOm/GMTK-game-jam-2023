import { Actor, Vector, CollisionType, CircleCollider, CollisionStartEvent } from "excalibur";
import { Resources } from "./resources";
import { Hero } from "./hero";

export class Enemy extends Actor {

    engine
    wallCollision
    held = false
    activeZone
    health = 3
    attack = 1

    constructor(wallCollision) {
        super({
            width: 16,
            height: 16
        })
        this.z = 0
        this.wallCollision = wallCollision
    }

    onInitialize(engine) {
        this.engine = engine
        this.graphics.use(Resources.TilemapPacked.getSprite(1,9))
        this.body.collisionType = CollisionType.Passive

        this.activeZone = new Actor({
            collider: new CircleCollider({radius: 50})
        })
        this.activeZone.on('precollision', (event) => {this.onPreCollision(event)})
        this.addChild(this.activeZone)

        this.on('pointerdown', () => {this.onClicked()})
    }

    onPreUpdate(engine) {
        if (this.held) {
            this.actions.clearActions()
            this.pos = engine.input.pointers.primary.lastWorldPos
        }
    }

    onPreCollision(event) {
        if (!this.held && event.other instanceof Hero) {
            this.actions.moveTo(event.other.pos, 50)
        }
    }

    onClicked() {
        if (this.held) {
            if (this.wallCollision.legalPos == true) {
                this.body.collisionType = CollisionType.Active
                this.held = !this.held
            }
        } else if (!this.engine.currentScene.start){
            this.body.collisionType = CollisionType.Passive
            this.held = !this.held
        }
    }

    pushBack(target) {
        this.actions.clearActions()
        const pushDirection = new Vector(this.pos.x - target.pos.x, this.pos.y - target.pos.y)
        this.actions.moveTo(new Vector(this.pos.x - -pushDirection.x, this.pos.y - -pushDirection.y), 100)
    }
    
}