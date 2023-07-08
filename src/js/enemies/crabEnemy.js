import { Vector } from "excalibur";
import { Enemy } from "./enemy";

export class Crab extends Enemy {
    constructor(wallcollision) {
        super(wallcollision)
        this.health = 5
        this.attack = 1
        this.speed = 60
        this.attackRadius = 30
        this.sprite = new Vector(2,9)
    }
}