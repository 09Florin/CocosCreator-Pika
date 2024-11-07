import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, RigidBody2D, Vec2 } from 'cc'; // tween is a way of moving an object
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({
        type: CCFloat,
        tooltip: 'How high can the player jump'
    })
    public jumpHeight: number = 1.5;

    @property({
        type: CCFloat,
        tooltip: 'how long can the Player jump'
    })
    public jumpDuration: number = 3.5;

    public playerAnimation: Animation;
    public playerLocation: Vec3;
    public hitSomething: boolean;

    onLoad(){
        this.resetPlayer();
        this.playerAnimation = this.getComponent(Animation);
        this.hitSomething = false;
    }

    resetPlayer() {
        // Reset position to the starting point (0, 0, 0 in this case)
        this.playerLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.playerLocation);
    
        // Reset rotation
        this.node.setRotation(0, 0, 0, 1);  // Quaternion for no rotation
    
        // Reset Rigidbody2D physics properties
        const rigidbody = this.getComponent(RigidBody2D);
        if (rigidbody) {
            // Set linear and angular velocity to zero
            rigidbody.linearVelocity = new Vec2(0, 0);
            rigidbody.angularVelocity = 0;
        }
    
        // Reset collision state
        this.hitSomething = false;
    }
    

    jump(){
        this.playerAnimation.stop();
//animation starting from the current position to (the duration of the jump, the new position where the player lands, {the way to animate the movement 'smooth' and then a part of code which is standard)}      
    tween(this.node)
        .to(this.jumpDuration, { position: new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0) }, {
            easing: "quadOut",  // Easing function (you can try other options like 'sineOut', 'quadInOut')
            onUpdate: (target: any, ratio: number) => {
                // Log the position during the tween
                console.log("Tween update:", target.position);
            }
        })
        .start(); // Properly start the tween
    
        this.playerAnimation.play();
    }
}


