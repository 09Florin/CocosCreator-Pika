import { _decorator, Component, director, Node, UITransform, Vec3, Canvas } from 'cc';
const { ccclass, property } = _decorator;
import { GameControl } from './GameControl';

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: 'Ground 1 is here'
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: 'Ground 2 is here'
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: 'Ground 3 is here'
    })
    public ground3: Node;

    public groundWidth: number = 320; // Set width of each ground node (constant)

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    public gameControlspeed = new GameControl;
    public gameSpeed: number;

    onLoad() {
        this.startUp();
    }

    startUp() {
        // Initialize the starting positions of the grounds
        this.tempStartLocation1.set(0, 0, 0);
        this.tempStartLocation2.set(this.groundWidth, 0, 0); // Place ground 2 right after ground 1
        this.tempStartLocation3.set(this.groundWidth * 2, 0, 0); // Place ground 3 after ground 2

        // Set the initial positions for the ground nodes
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    update(deltaTime: number) {
        this.gameSpeed = this.gameControlspeed.speed;
        // Sanity check: Log deltaTime to ensure it's being calculated
        //console.log("deltaTime: ", deltaTime);

        // Move the grounds left based on game speed and deltaTime
        this.tempStartLocation1 = this.ground1.getPosition();
        this.tempStartLocation2 = this.ground2.getPosition();
        this.tempStartLocation3 = this.ground3.getPosition();

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

        // Log the positions for debugging
        // console.log("Ground 1 position: ", this.tempStartLocation1.x);
        // console.log("Ground 2 position: ", this.tempStartLocation2.x);
        // console.log("Ground 3 position: ", this.tempStartLocation3.x);

        // When ground 1 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation1.x <= -this.groundWidth) {
            this.tempStartLocation1.x = Math.max(this.tempStartLocation2.x, this.tempStartLocation3.x) + this.groundWidth;
        }

        // When ground 2 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation2.x <= -this.groundWidth) {
            this.tempStartLocation2.x = Math.max(this.tempStartLocation1.x, this.tempStartLocation3.x) + this.groundWidth;
        }

        // When ground 3 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation3.x <= -this.groundWidth) {
            this.tempStartLocation3.x = Math.max(this.tempStartLocation1.x, this.tempStartLocation2.x) + this.groundWidth;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}
