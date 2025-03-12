import { _decorator, Component, director, Label, Node } from 'cc';
import { EventTable } from '../EventTable';
const { ccclass, property } = _decorator;

@ccclass('MultipleView      ')
export class MultipleView extends Component {
    @property(Label)
    private numLabel: Label

    private curNum: number

    protected start(): void {
        this.init()
        director.on(EventTable.All_Init, this.init, this)
        director.on(EventTable.Multiple_Win, this.getWin, this)
    }

    private openEventListener() {
        director.on(EventTable.All_Init, this.init, this)
        director.on(EventTable.Multiple_Win, this.getWin, this)
    }

    private closeEventListener() {
        director.off(EventTable.All_Init, this.init, this)
        director.off(EventTable.Multiple_Win, this.getWin, this)
    }

    protected onDestroy(): void {
        this.closeEventListener()
    }

    private init() {
        this.curNum = 1
        this.setText("X1")
    }

    private setText(str: string) {
        this.numLabel.string = str
    }

    private getWin(winNum: number) {
        this.curNum *= winNum
        this.setText("X "+this.curNum.toString())
    }
}

