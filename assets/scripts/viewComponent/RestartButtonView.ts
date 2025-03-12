import { _decorator, Button, Component, director, Node } from 'cc';
import { EventTable } from '../EventTable';
const { ccclass, property } = _decorator;

@ccclass('RestartButtonView')
export class RestartButtonView extends Component {

    protected onLoad(): void {
        this.init()
        this.openEventListener()
    }

    private openEventListener() {
        director.on(EventTable.Game_Over,this.showRestartButton,this)
        director.on(EventTable.All_Init,this.init,this)
    }

    private closeEventListener() {
        director.off(EventTable.Game_Over,this.showRestartButton,this)
        director.off(EventTable.All_Init,this.init,this)
    }

    protected onDestroy(): void {
        this.closeEventListener()
    }
    
    private init(){
        this.node.active = false
    }

    private showRestartButton(){
        this.node.active = true
    }

    private restart(){
        director.emit(EventTable.All_Init)
    }
}

