import { Scene, Physics, Actor, Vector, Shape, CompositeCollider, CollisionType, EasingFunctions } from "excalibur"
import { Hero } from "./hero"
import { Enemy } from "./enemies/enemy"
import { Resources } from "./resources";
import { WallCollision } from "./wallcollision";
import { GameUI } from "./gameUI";
import setupMusic from "../sounds/Zane_Little_Insect_Factory.mp3"
import fightMusic from "../sounds/Eggy_Toast_Pressure.mp3"

export class Level extends Scene {

    engine
    hero
    enemies = [];
    gameUI
    wallCollision;
    start = false
    path = [new Vector(40,170),new Vector(40,100),new Vector(180,100),new Vector(180,40),new Vector(280,40),new Vector(280,170)]
    enemies = [];
    retryButton;
    nextLevelButton;
    setupMusic = new Audio(setupMusic)
    fightMusic = new Audio(fightMusic)

    constructor() {
        super()
    }

    onActivate() {
        this.setupMusic.loop = true
        this.fightMusic.loop = true
        this.setupMusic.play()
        this.retry()
    }

    onDeactivate() {
        this.setupMusic.pause()
        this.fightMusic.pause()
    }

    onInitialize(engine) {
        this.engine = engine
        Physics.useArcadePhysics()

        this.createLevelCollision()

        const bg = new Actor({anchor: new Vector(0,0)})
        bg.graphics.use(Resources.Map.toSprite())
        this.add(bg)

        this.gameUI = new GameUI(['orc', 'rat', 'crab'])
        this.add(this.gameUI)

        const heroDestination = new Actor({
            pos: new Vector(280, 180),
            width: 48,
            height: 16
        })
        heroDestination.on('collisionstart', (event) => {this.heroWin(event)})
        this.add(heroDestination)

        this.createMenu()
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

    createMenu() {
        this.retryButton = new Actor({
            pos: new Vector(160, -80),
            width: Resources.RetryButton.width,
            height: Resources.RetryButton.height
        })
        this.retryButton.graphics.use(Resources.RetryButton.toSprite())
        this.add(this.retryButton)

        this.retryButton.on('pointerup', () => {this.retry()})

        this.nextLevelButton = new Actor({
            pos: new Vector(160, -100),
            width: Resources.NextButton.width,
            height: Resources.NextButton.height
        })
        this.nextLevelButton.graphics.use(Resources.NextButton.toSprite())
        this.add(this.nextLevelButton)

        this.nextLevelButton.on('pointerup', () => {this.nextLevel()})
    }

    startGame() {
        if (this.start == true) {
            return;
        }
        for (const enemy of this.enemies) {
            enemy.start()
        }
        this.setupMusic.pause()
        this.fightMusic.play()
        this.start = true
        this.hero = new Hero(this.path)
        this.add(this.hero)
    }

    retry() {
        this.retryButton.actions.easeTo(new Vector(this.retryButton.pos.x, -80), 1000, EasingFunctions.EaseInOutCubic)
        this.nextLevelButton.actions.easeTo(new Vector(this.nextLevelButton.pos.x, -100), 1000, EasingFunctions.EaseInOutCubic)
        if (this.hero) {
            this.hero.kill()
        }
        this.hero = new Hero(this.path)
        this.start = false
        for (const enemy of this.enemies) {
            enemy.kill()
        }
        this.enemies = []
        this.gameUI.retry()
        this.setupMusic.play()
        this.fightMusic.pause()
    }

    heroWin(event) {
        if (event.other instanceof Hero) {
            this.hero.actions.clearActions()

            for (const enemy of this.enemies) {
                enemy.actions.clearActions()
            }

            this.retryButton.actions.easeTo(new Vector(this.retryButton.pos.x, 100), 1000, EasingFunctions.EaseInOutCubic)
        }
    }

    enemiesWin() {
        this.hero.actions.clearActions()

        for (const enemy of this.enemies) {
            enemy.actions.clearActions()
        }

        this.retryButton.actions.easeTo(new Vector(this.retryButton.pos.x, 100), 1000, EasingFunctions.EaseInOutCubic)
        this.nextLevelButton.actions.easeTo(new Vector(this.nextLevelButton.pos.x, 80), 1000, EasingFunctions.EaseInOutCubic)
    }

    nextLevel() {
        this.engine.goToScene('level2')
        Resources.ClickSound.play()
    }
}