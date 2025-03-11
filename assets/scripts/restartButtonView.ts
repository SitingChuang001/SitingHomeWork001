import { _decorator, Button, Component, director, Node } from 'cc';
import { eventTable } from './eventTable';
const { ccclass, property } = _decorator;

@ccclass('restartButtonView')
export class restartButtonView extends Component {

    protected onLoad(): void {
        this.init()
        director.on(eventTable.Game_Over,this.showRestartButton,this)
        director.on(eventTable.All_Init,this.init,this)
    }
    private init(){
        this.node.active = false
    }

    private showRestartButton(){
        this.node.active = true
    }

    private restart(){
        director.emit(eventTable.All_Init)
    }
}

