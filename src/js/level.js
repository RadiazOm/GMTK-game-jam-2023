import { Scene, Physics, Actor, Vector, Shape, CompositeCollider, CollisionType } from "excalibur"
import { Hero } from "./hero"
import { Enemy } from "./enemy"
import { Resources } from "./resources";
import { WallCollision } from "./wallcollision";
import { GameUI } from "./gameUI";

export class Level extends Scene {

    hero
    enemies = [];
    wallCollision;
    start = false

    constructor() {
        super()
    }

    onInitialize() {
        Physics.useArcadePhysics()

        this.createLevelCollision()

        const bg = new Actor({anchor: new Vector(0,0)})
        bg.graphics.use(Resources.Map.toSprite())
        this.add(bg)

        const gameUI = new GameUI(3)
        this.add(gameUI)
    }

    createLevelCollision() {
        const compositeCollider = new CompositeCollider([
            Shape.Box(16, 192, new Vector(0,0), new Vector(0,-6)),
            Shape.Box(16, 192, new Vector(0,0), new Vector(304,-6)),
            Shape.Box(320, 16, new Vector(0,0), new Vector(0,-11)),
            Shape.Box(48, 48, new Vector(0,0), new Vector(96,35)),
            Shape.Box(48, 48, new Vector(0,0), new Vector(208,68)),
            Shape.Box(80, 48, new Vector(0,0), new Vector(63,132)),
            Shape.Box(48, 16, new Vector(0,0), new Vector(143,164)),
            Shape.Box(64, 32, new Vector(0,0), new Vector(191,148)),
            Shape.Box(32, 32, new Vector(0,0), new Vector(223,116)),
            Shape.Box(48, 16, new Vector(0,0), new Vector(208,4)),
        ])

        this.wallCollision = new WallCollision(compositeCollider)

        this.add(this.wallCollision)
    }

    startGame() {
        this.start = true
        this.hero = new Hero()
        this.add(this.hero)
    }
}