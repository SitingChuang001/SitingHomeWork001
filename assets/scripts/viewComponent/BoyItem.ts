import { _decorator, Color, Component, director, Label, Node, sp } from 'cc';
import { EventTable } from '../EventTable';
const { ccclass, property } = _decorator;

@ccclass('boyPrefab')
export class BoyItem extends Component {
    private index: number
    private _allReadyWin: boolean = false
    get allReadyWin(): boolean {
        return this._allReadyWin;
    }
    private spine: sp.Skeleton
    @property(Label)
    private label: Label
    @property(Node)
    private clickNode: Node

    protected onLoad(): void {
        this.spine = this.node.getComponent(sp.Skeleton)
        this.openEventListener()
        this.spine.setCompleteListener((trackEntry: sp.spine.TrackEntry) => {
            if (trackEntry.animation.name === "hit") {
                director.emit(EventTable.Show_End_Complete)
            }
        });
    }

    private openEventListener() {
        director.on(EventTable.All_Init, this.init, this)
        director.on(EventTable.Game_Over, this.gameOver, this)
    }

    private closeEventListener() {
        director.off(EventTable.All_Init, this.init, this)
        director.off(EventTable.Game_Over, this.gameOver, this)
        this.turnOffClick()
    }

    protected onDestroy(): void {
        this.closeEventListener()
    }
    protected onEnable(): void {
        this.init()
    }

    private init() {
        this._allReadyWin = false
        this.spine.setAnimation(0, animationName.Idle, true)
        this.spine.color = new Color("#FFFFFF")
        this.setText("")
        this.turnOnClick()
    }

    public setText(str: string) {
        this.label.string = str
    }

    public setIndex(num: number) {
        this.index = num
    }

    public win(str: string) {
        this.spine.setAnimation(0, animationName.Win, false)
        this.setText(str)
        this._allReadyWin = true
        this.turnOffClick()
    }

    public end(str: string) {
        this.spine.setAnimation(0, animationName.Hit, false)
        this.setText(str)
        this.spine.color = new Color("#3A3131")
        this._allReadyWin = true
        this.turnOffClick()
    }

    private gameOver() {
        if (!this._allReadyWin) {
            this.spine.setAnimation(0, animationName.Death, false)
            this.spine.color = new Color("#3A3131")
            this.turnOffClick()
        }
    }

    private turnOffClick() {
        this.clickNode.off(Node.EventType.MOUSE_UP, this.onClick, this)
    }

    private turnOnClick() {
        this.clickNode.on(Node.EventType.MOUSE_UP, this.onClick, this)
    }

    private onClick() {
        director.emit(EventTable.Item_Click, this.index)
    }

}
enum animationName {
    Win = "jump",
    Death = "death",
    Idle = "idle",
    Hit = "hit"
}

