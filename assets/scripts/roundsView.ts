import { _decorator, Component, director, Label, Node } from 'cc';
import { eventTable } from './eventTable';
const { ccclass, property } = _decorator;

@ccclass('roundsView')
export class roundsView extends Component {
        @property(Label)
        private numLabel: Label
    
        private curNum: number
    
        protected start(): void {
            this.init()
            this.openEventListener()
        }

        private openEventListener() {
            director.on(eventTable.All_Init, this.init, this)
            director.on(eventTable.Rounds_Win, this.getWin, this)
        }
    
        private closeEventListener() {
            director.off(eventTable.All_Init, this.init, this)
            director.off(eventTable.Rounds_Win, this.getWin, this)
        }
    
        protected onDestroy(): void {
            this.closeEventListener()
        }

        private init() {
            this.curNum = 0
            this.setText("0")
        }
        private setText(str: string) {
            this.numLabel.string = str
        }
        private getWin(winNum: number) {
            this.curNum += winNum
            this.setText("+ "+this.curNum.toString())
        }
}

