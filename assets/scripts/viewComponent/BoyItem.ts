import { _decorator, Color, Component, director, Label, Node, sp } from 'cc';
import { EventTable } from '../EventTable';
import { PlayType } from '../Controller/GameViewController';
const { ccclass, property } = _decorator;

@ccclass('BoyItem')
export class BoyItem extends Component {
    private index: number
    private curState: ItemState
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
        this.stateChanged(ItemState.Init)
    }

    private init() {
        this.curState = ItemState.Init
        this.spine.color = new Color("#FFFFFF")
        this.setText("")
        this.turnOnClick()
        this.stateChanged(ItemState.Idle)
    }

    private idle(){
        this.curState = ItemState.Idle
        this.spine.setAnimation(0, animationName.Idle, true)
    }

    public setText(str: string) {
        this.label.string = str
    }

    public setIndex(num: number) {
        this.index = num
    }

    public showAnimation(type: PlayType , str?: string){
        if(this.curState!=ItemState.Idle)
            return
        switch(type){
            case PlayType.Win:
                this.win(str)
                break
            case PlayType.End:
                this.end("End")
                break
            case PlayType.Game_Over:
                this.gameOver()
                break
        }
        this.stateChanged(ItemState.Complete)
    }

    public win(str: string) {
        this.spine.setAnimation(0, animationName.Win, false)
        this.setText(str)
    }

    public end(str: string) {
        this.spine.setAnimation(0, animationName.End, false)
        this.setText(str)
        this.spine.color = new Color("#3A3131")
    }

    private complete(){
        this.curState = ItemState.Complete
        this.turnOffClick()
    }

    private gameOver() {
            this.spine.setAnimation(0, animationName.Death, false)
            this.spine.color = new Color("#3A3131")
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

    public stateChanged(state: ItemState) {
        switch (state) {
            case ItemState.Init:
                this.init()
                break
            case ItemState.Idle:
                this.idle()
                break
            case ItemState.Complete:
                this.complete()
                break
        }
    }

}
enum animationName {
    Win = "jump",
    Death = "death",
    Idle = "idle",
    End = "hit"
}

enum ItemState {
    Init,
    Idle,
    Complete
}

