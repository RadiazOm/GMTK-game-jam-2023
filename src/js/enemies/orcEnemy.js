import { Vector } from "excalibur";
import { Enemy } from "./enemy";

export class Orc extends Enemy {
    constructor(wallcollision) {
        super(wallcollision)
        this.health = 3
        this.attack = 2
        this.speed = 50
        this.attackRadius = 50
        this.sprite = new Vector(1,9)
    }
}