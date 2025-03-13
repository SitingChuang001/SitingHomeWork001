import { _decorator, Button, Color, Component, DebugMode, director, Label, sp } from 'cc';
import { EventTable } from '../EventTable';
import { GameViewController, PlayType } from '../Controller/GameViewController';
const { ccclass, property } = _decorator;

@ccclass('BoyItem')
export class BoyItem extends Component {
    @property(Label)
    private label: Label
    @property(Button)
    private clickNode: Button

    private controller: GameViewController

    private index: number
    public curState: ItemState
    private spine: sp.Skeleton

    protected onLoad(): void {
        this.spine = this.node.getComponent(sp.Skeleton)
    }

    protected onDestroy(): void {
        this.turnOffClick()
    }

    protected onEnable(): void {
        this.stateChanged(ItemState.Init)
    }

    public setComtroller(contor: GameViewController) {
        this.controller = contor
    }

    private init() {
        this.curState = ItemState.Init
        this.spine.color = new Color("#FFFFFF")
        this.setText("")
        this.turnOnClick()
        this.spine.setAnimation(0, animationName.Idle, true)
        this.stateChanged(ItemState.Idle)
        this.spine.setCompleteListener(() => { })
    }

    private idle() {
        this.curState = ItemState.Idle
        this.spine.setAnimation(0, animationName.Idle, true)
    }

    public setText(str: string) {
        this.label.string = str
    }

    public setIndex(num: number) {
        this.index = num
    }

    public showAnimation(type: PlayType, str?: string) {
        if (this.curState != ItemState.Idle)
            return
        switch (type) {
            case PlayType.Win:
                this.win(str)
                break
            case PlayType.End:
                this.end(str)
                break
            case PlayType.Game_Over:
                this.gameOver(str)
                break
        }
        this.stateChanged(ItemState.Complete)
    }

    private win(str: string) {
        this.spine.setCompleteListener(() => {
            this.spine.setAnimation(0, animationName.Hit, false)
            this.spine.setCompleteListener(() => { })
        })
        this.spine.setAnimation(0, animationName.Win, false)
        this.setText(str)
    }

    private end(str: string) {
        this.spine.setCompleteListener(() => {
            this.spine.setCompleteListener(() => { this.controller.gameOver() })
            this.spine.setAnimation(0, animationName.Death, false)
        })
        this.spine.setAnimation(0, animationName.Win, false)
        this.setText(str)
        this.spine.color = new Color("#3A3131")
    }

    private complete() {
        this.curState = ItemState.Complete
        this.turnOffClick()
    }

    private gameOver(str: string) {
        this.spine.setAnimation(0, animationName.Death, false)
        this.setText(str)
        this.spine.color = new Color("#3A3131")
        this.stateChanged(ItemState.Complete)
    }

    public turnOffClick() {
        this.clickNode.interactable = false
    }

    public turnOnClick() {
        this.clickNode.interactable = true
    }

    private onClick() {
        this.controller.setResult(this.index)
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
    Hit = "hit"
}

export enum ItemState {
    Init,
    Idle,
    Complete
}

