import { _decorator, Component, Node, Vec3, screen, find, UITransform, director, Canvas } from 'cc';
import { Results } from './Results';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Clouds')
export class Clouds extends Component {

    @property({
        type: Node,
        tooltip: 'Cloud 1 is here'
    })
    public cloud1: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 2 is here'
    })
    public cloud2: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 3 is here'
    })
    public cloud3: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 4 is here'
    })
    public cloud4: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 5 is here'
    })
    public cloud5: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 6 is here'
    })
    public cloud6: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 7 is here'
    })
    public cloud7: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 8 is here'
    })
    public cloud8: Node;

    @property({
        type: Node,
        tooltip: 'Cloud 9 is here'
    })
    public cloud9: Node;

    public cloudWidth: number = 200;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;
    public tempStartLocation4 = new Vec3;
    public tempStartLocation5 = new Vec3;
    public tempStartLocation6 = new Vec3;
    public tempStartLocation7 = new Vec3;
    public tempStartLocation8 = new Vec3;
    public tempStartLocation9 = new Vec3;

    public gameSpeed: number;
    public results = new Results;

    public isPass1: boolean;
    public isPass2: boolean;
    public isPass3: boolean;
    public isPass4: boolean;
    public isPass5: boolean;
    public isPass6: boolean;
    public isPass7: boolean;
    public isPass8: boolean;
    public isPass9: boolean;
    public gameCtrl;

    onLoad() {
        this.gameCtrl = find("GameControl").getComponent("GameControl")
        this.startUp();
        this.isPass1 = false;
        this.isPass2 = false;
        this.isPass3 = false;
        this.isPass4 = false;
        this.isPass5 = false;
        this.isPass6 = false;
        this.isPass7 = false;
        this.isPass8 = false;
        this.isPass9 = false;
    }

    startUp() {
        this.tempStartLocation1.set(random(800, 1300), random(-200, 400), 0);
        this.tempStartLocation2.set(random(1500, 2000), random(-200, 400), 0);
        this.tempStartLocation3.set(random(2500, 3000), random(-200, 400), 0);
        this.tempStartLocation4.set(random(3300, 3790), random(-200, 400), 0);
        this.tempStartLocation5.set(random(4299, 4800), random(-200, 400), 0);
        this.tempStartLocation6.set(random(5430, 6000), random(-200, 400), 0);
        this.tempStartLocation7.set(random(6500, 7000), random(-200, 400), 0);
        this.tempStartLocation8.set(random(7433, 7896), random(-200, 400), 0);
        this.tempStartLocation9.set(random(8300, 8500), random(-200, 400), 0);

        this.cloud1.setPosition(this.tempStartLocation1);
        this.cloud2.setPosition(this.tempStartLocation2);
        this.cloud3.setPosition(this.tempStartLocation3);
        this.cloud4.setPosition(this.tempStartLocation4);
        this.cloud5.setPosition(this.tempStartLocation5);
        this.cloud6.setPosition(this.tempStartLocation6);
        this.cloud7.setPosition(this.tempStartLocation7);
        this.cloud8.setPosition(this.tempStartLocation8);
        this.cloud9.setPosition(this.tempStartLocation9);
    }

    update(deltaTime: number) {
        this.gameSpeed = this.gameCtrl.speed-100;

        // Move the grounds left based on game speed and deltaTime
        this.tempStartLocation1 = this.cloud1.getPosition();
        this.tempStartLocation2 = this.cloud2.getPosition();
        this.tempStartLocation3 = this.cloud3.getPosition();
        this.tempStartLocation4 = this.cloud4.getPosition();
        this.tempStartLocation5 = this.cloud5.getPosition();
        this.tempStartLocation6 = this.cloud6.getPosition();
        this.tempStartLocation7 = this.cloud7.getPosition();
        this.tempStartLocation8 = this.cloud8.getPosition();
        this.tempStartLocation9 = this.cloud9.getPosition();

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

        // Log the positions for debugging
        // console.log("Cloud 1 position: ", this.tempStartLocation1.x);
        // console.log("Cloud 2 position: ", this.tempStartLocation2.x);
        // console.log("Cloud 3 position: ", this.tempStartLocation3.x);
        // console.log("Cloud 4 position: ", this.tempStartLocation4.x);
        // console.log("Cloud 5 position: ", this.tempStartLocation5.x);
        // console.log("Cloud 6 position: ", this.tempStartLocation6.x);
        // console.log("Cloud 7 position: ", this.tempStartLocation7.x);
        // console.log("Cloud 8 position: ", this.tempStartLocation8.x);
        // console.log("Cloud 9 position: ", this.tempStartLocation9.x);

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        const canvasWidth = canvas.getComponent(UITransform).width;

        // When ground 1 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation1.x <= -350) {
            this.isPass1 = false;
            this.tempStartLocation1.set(random(400, 800) + canvasWidth, random(-200, 400), 0);
        }

        // When ground 2 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation2.x <= -350) {
            this.isPass2 = false;
            this.tempStartLocation2.set(random(400, 800) + canvasWidth , random(-186, 400), 0);
        }

        // When ground 3 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation3.x <= -350) {
            this.isPass3 = false;
            this.tempStartLocation3.set(random(400, 800) + canvasWidth, random(-210, 408), 0);
        }

        // When ground 4 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation4.x <= -350) {
            this.isPass4 = false;
            this.tempStartLocation4.set(random(400, 800) + canvasWidth, random(-100, 500), 0);
        }

        // When ground 5 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation5.x <= -350) {
            this.isPass5 = false;
            this.tempStartLocation5.set(random(400, 800) + canvasWidth , random(-220, 300), 0);
        }

        // When ground 6 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation6.x <= -350) {
            this.isPass6 = false;
            this.tempStartLocation6.set(random(400, 800) + canvasWidth, random(-130, 366), 0);
        }

        // When ground 7 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation7.x <= -350) {
            this.isPass7 = false;
            this.tempStartLocation7.set(random(400, 800) + canvasWidth, random(-165, 409), 0);
        }

        // When ground 8 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation8.x <= -350) {
            this.isPass8 = false;
            this.tempStartLocation8.set(random(400, 800) + canvasWidth , random(-186, 0), 0);
        }

        // When ground 9 moves off-screen, place it at the rightmost position
        if (this.tempStartLocation9.x <= -350) {
            this.isPass9 = false;
            this.tempStartLocation9.set(random(400, 800) + canvasWidth, random(-193, 200), 0);
        }

        // Apply the updated positions to the ground nodes using setPosition
        this.cloud1.setPosition(this.tempStartLocation1);
        this.cloud2.setPosition(this.tempStartLocation2);
        this.cloud3.setPosition(this.tempStartLocation3);
        this.cloud4.setPosition(this.tempStartLocation4);
        this.cloud5.setPosition(this.tempStartLocation5);
        this.cloud6.setPosition(this.tempStartLocation6);
        this.cloud7.setPosition(this.tempStartLocation7);
        this.cloud8.setPosition(this.tempStartLocation8);
        this.cloud9.setPosition(this.tempStartLocation9);

        if (this.isPass1 == false && this.cloud1.position.x <= 0){
            this.isPass1 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass2 == false && this.cloud2.position.x <= 0){
            this.isPass2 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass3 == false && this.cloud3.position.x <= 0){
            this.isPass3 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass4 == false && this.cloud4.position.x <= 0){
            this.isPass4 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass5 == false && this.cloud5.position.x <= 0){
            this.isPass5 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass6 == false && this.cloud6.position.x <= 0){
            this.isPass6 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass7 == false && this.cloud7.position.x <= 0){
            this.isPass7 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass8 == false && this.cloud8.position.x <= 0){
            this.isPass8 = true;
            this.gameCtrl.pastCloud();
        }
        if (this.isPass9 == false && this.cloud9.position.x <= 0){
            this.isPass9 = true;
            this.gameCtrl.pastCloud();
        }
    }

     resetClouds(){
       // Initialize the starting positions of the grounds
       this.tempStartLocation1.set(random(800, 1300), random(-200, 600), 0);
       this.tempStartLocation2.set(random(1500, 2000), random(-200, 600), 0);
       this.tempStartLocation3.set(random(2500, 3000), random(-200, 600), 0);
       this.tempStartLocation4.set(random(3300, 3790), random(-200, 600), 0);
       this.tempStartLocation5.set(random(4299, 4800), random(-200, 600), 0);
       this.tempStartLocation6.set(random(5430, 6000), random(-200, 600), 0);
       this.tempStartLocation7.set(random(6500, 7000), random(-200, 600), 0);
       this.tempStartLocation8.set(random(7433, 7896), random(-200, 600), 0);
       this.tempStartLocation9.set(random(8300, 8500), random(-200, 600), 0);

       // Set the initial positions for the ground nodes
       this.cloud1.setPosition(this.tempStartLocation1);
       this.cloud2.setPosition(this.tempStartLocation2);
       this.cloud3.setPosition(this.tempStartLocation3);
       this.cloud4.setPosition(this.tempStartLocation4);
       this.cloud5.setPosition(this.tempStartLocation5);
       this.cloud6.setPosition(this.tempStartLocation6);
       this.cloud7.setPosition(this.tempStartLocation7);
       this.cloud8.setPosition(this.tempStartLocation8);
       this.cloud9.setPosition(this.tempStartLocation9);

       this.isPass1 = false;
       this.isPass2 = false;
       this.isPass3 = false;
       this.isPass4 = false;
       this.isPass5 = false;
       this.isPass6 = false;
       this.isPass7 = false;
       this.isPass8 = false;
       this.isPass9 = false;
     }
}


