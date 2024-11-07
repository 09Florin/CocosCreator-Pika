import { __private, _decorator, CCInteger, Component, director, EventKeyboard, input, Input, KeyCode, Node, Contact2DType, Collider2D,IPhysics2DContact, UITransform, setPropertyEnumType } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Player } from './Player';
import { Clouds } from './Clouds';
import { PlayerAudio } from './PlayerAudio';

const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {

    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: 'results go here'
    })
    public result: Results;

    @property({
        type: Player
    })
    public player: Player;

    @property({
        type: Clouds
    })
    public clouds: Clouds;

    @property({
        type: PlayerAudio   
    })
    public audioClip: PlayerAudio;

    @property({
        type: CCInteger,
        tooltip: 'The speed the Ground Node moves'
    })
    public speed: number = 300;

    @property ({
        type: CCInteger,
        tooltip: 'The speed the obstacles move towards the player'
    })
    public cloudSpeed: number = 200;

    public isOver: boolean;


    onLoad(){
        this.initListener();
        this.result.resetScore();
        this.isOver = true;
        director.pause();
    }

    initListener(){ //Listens to player's decisions like clicking, etc
        //input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(Node.EventType.TOUCH_START, () => {
            
            if(this.isOver == true){
                this.resetGame();
                this.player.resetPlayer();
                this.startGame();
            }

            if (this.isOver == false){
                this.player.jump();
                this.audioClip.onAudioQueue(3);
            }
        });
    }

    //Test method for score logic; DELETE in final version
    // onKeyDown(event: EventKeyboard){//just for testing
    //     switch(event.keyCode){
    //         case KeyCode.KEY_A:
    //             this.gameOver();
    //         break;
    //         case KeyCode.KEY_P:
    //             this.result.addScore();
    //         break;
    //         case KeyCode.KEY_Q:
    //             this.resetGame();
    //             this.player.resetPlayer();
    //         break;
    //     }
    // }

    startGame(){
        this.result.hideResults();
        director.resume();
    }

    gameOver(){
        this.result.showResults();
        this.isOver = true;
        this.audioClip.onAudioQueue(1);
        director.pause();
    }

    resetGame(){
        this.result.resetScore();
        this.isOver = false;
        this.startGame();
        this.clouds.resetClouds();
    }

    pastCloud(){
        this.result.addScore();
        this.audioClip.onAudioQueue(2);
    }

    contactCollider(){
        let collider = this.player.getComponent(Collider2D);
       
        if(collider){
         collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        this.player.hitSomething = true;
        this.audioClip.onAudioQueue(4);
    }

    playerStruck(){
        this.contactCollider();
        if(this.player.hitSomething == true){
            this.gameOver();
        }
    }

    update(){
        if(this.isOver == false){
            this.playerStruck();
        }
    }
}