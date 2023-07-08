import { Actor, Vector, CollisionType, CircleCollider } from "excalibur"
import { Resources } from "./resources"
import { Enemy } from "./enemies/enemy"

export class Hero extends Actor {

    engine;
    health = 10;
    attack = 2;
    path = [new Vector(40,170),new Vector(40,100),new Vector(180,100),new Vector(180,40),new Vector(280,40),new Vector(280,170)]
    currentPath = 0;
    inCombat = false


    constructor() {
        super({
            width: 16,
            height: 16
        })
    }

    onInitialize(engine) {
        this.engine = engine
        this.pos = this.path[0]
        this.graphics.use(Resources.TilemapPacked.getSprite(1,8))
        this.body.collisionType = CollisionType.Active

        this.activeZone = new Actor({
            collider: new CircleCollider({radius: 50})
        })
        this.activeZone.on('precollision', (event) => {this.onPreCollision(event)})
        this.addChild(this.activeZone)

        this.on('collisionstart', (event) => {this.onCollision(event)})
    }

    onPreUpdate() {
        if (Math.round(this.pos.x) == this.path[this.currentPath].x && Math.round(this.pos.y) == this.path[this.currentPath].y && this.engine.currentScene.start == true) {
            this.currentPath++
            this.actions.moveTo(this.path[this.currentPath], 50)
        }
    }

    
    onPreCollision(event) {
        if (event.other instanceof Enemy) {
            this.actions.moveTo(event.other.pos, 50)

            if (this.inCombat == false) {
                this.inCombat = true
                this.actions.clearActions()
            }
        }
        
    }

    onCollision(event) {
        if (event.other instanceof Enemy) {
            this.health -= event.other.attack
            event.other.health -= this.attack
            this.pushBack(event.other)
            event.other.pushBack(this)
            if (this.health <= 0) {
                this.kill()
            }

            if (event.other.health <= 0) {
                event.other.kill()
                this.actions.moveTo(this.path[this.currentPath], 50)
                this.inCombat = false
            }
        }
    }

    pushBack(target) {
        this.actions.clearActions()
        const pushDirection = new Vector(this.pos.x - target.pos.x, this.pos.y - target.pos.y)
        this.actions.moveTo(new Vector(this.pos.x - -pushDirection.x, this.pos.y - -pushDirection.y), 100)
    }
}