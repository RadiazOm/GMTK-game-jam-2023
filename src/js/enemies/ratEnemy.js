import { Vector } from "excalibur";
import { Enemy } from "./enemy";

export class Rat extends Enemy {
    constructor(wallcollision) {
        super(wallcollision)
        this.health = 1
        this.attack = 3
        this.speed = 70
        this.attackRadius = 40
        this.sprite = new Vector(3,10)
    }
}