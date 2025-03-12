import { _decorator, Component, director, Label, Node } from 'cc';
import { EventTable } from '../EventTable';
const { ccclass, property } = _decorator;

@ccclass('RoundsView')
export class RoundsView extends Component {
        @property(Label)
        private numLabel: Label
    
        private curNum: number
    
        protected start(): void {
            this.init()
            this.openEventListener()
        }

        private openEventListener() {
            director.on(EventTable.All_Init, this.init, this)
            director.on(EventTable.Rounds_Win, this.getWin, this)
        }
    
        private closeEventListener() {
            director.off(EventTable.All_Init, this.init, this)
            director.off(EventTable.Rounds_Win, this.getWin, this)
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

