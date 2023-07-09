import { Timer, Vector, CircleCollider, Actor, CollisionType, Color } from "excalibur";
import { Resources } from "../resources";
import { Enemy } from "./enemy";
import { Projectile } from "./projectile";
import { Hero } from "../hero";

export class EvilWizard extends Enemy {

    projectileAttack
    projectileTimer = 0
    projectileCooldown = 3

    constructor(wallcollision) {
        super(wallcollision)
        this.health = 1
        this.attack = 0
        this.projectileAttack = 1
        this.speed = 20
        this.attackRadius = 60
        this.sprite = new Vector(3,9)
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

        let timer = new Timer({
            fcn: () => {this.projectileTimer--},
            interval: 1000,
            repeats: true
        })
        this.engine.currentScene.add(timer)
        timer.start()
    }

    onPreCollision(event) {
        if (!this.held && event.other instanceof Hero) {
            const pushDirection = new Vector(this.pos.x - event.other.pos.x, this.pos.y - event.other.pos.y)
            this.actions.moveTo(new Vector(this.pos.x - -pushDirection.x, this.pos.y - -pushDirection.y), this.speed)
            if (this.projectileTimer <= 0) {
                this.projectileTimer = this.projectileCooldown
                this.shootProjectile(pushDirection)
            }
        }
    }

    shootProjectile(direction) {
        let projectile = new Projectile(this.pos, direction, 1)
        this.engine.currentScene.add(projectile)
    }
}