import { _decorator, Component, Node, AudioClip, AudioSource, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerAudio')
export class PlayerAudio extends Component {

    @property({
        type: [AudioClip]
    })
    public clips: AudioClip[] = []; 

    @property({
        type:AudioSource        
    })
    public audioSource: AudioSource = null;

    onAudioQueue(index: number){
        let clip: AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }
}


