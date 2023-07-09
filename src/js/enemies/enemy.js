import { Actor, Vector, CollisionType, CircleCollider, CollisionStartEvent, Color } from "excalibur";
import { Resources } from "../resources";
import { Hero } from "../hero";

export class Enemy extends Actor {

    engine
    wallCollision
    held = false
    activeZone
    collisionCheck;
    health = 1
    attack = 1
    speed = 50
    attackRadius = 50
    sprite = new Vector(1,9)

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
        this.graphics.use(Resources.TilemapPacked.getSprite(this.sprite.x, this.sprite.y))
        this.body.collisionType = CollisionType.Passive

        this.collisionCheck = new Actor({
            collider: new CircleCollider({radius: 1}),
        })
        this.addChild(this.collisionCheck)

        this.activeZone = new Actor({
            collider: new CircleCollider({radius: this.attackRadius}),
            radius: this.attackRadius,
            color: new Color(128, 128, 128, 0.3)
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
            this.actions.moveTo(event.other.pos, this.speed)
        }
    }

    onClicked() {
        if (this.held) {
            if (this.wallCollision.legalPos == true) {
                for (const enemy of this.engine.currentScene.enemies) {
                    if (enemy != this && this.collisionCheck.within(enemy, this.attackRadius)) {
                        return;
                    }
                }
                this.body.collisionType = CollisionType.Active
                this.held = !this.held
                Resources.DropSound.play()
            }
        } else if (!this.engine.currentScene.start){
            for (const enemy of this.engine.currentScene.enemies) {
                if (enemy.held) {
                    return;
                }
            }
            this.body.collisionType = CollisionType.Passive
            this.held = !this.held
            Resources.PickupSound.play()
        }
    }

    pushBack(target) {
        this.actions.clearActions()
        const pushDirection = new Vector(this.pos.x - target.pos.x, this.pos.y - target.pos.y)
        this.actions.moveTo(new Vector(this.pos.x - -pushDirection.x, this.pos.y - -pushDirection.y), 100)
    }

    start() {
        this.activeZone.color = new Color(128, 128, 128, 0)
        console.log(this.activeZone.color)
    }
    
}