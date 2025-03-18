import { _decorator, Button, Color, Component, DebugMode, director, Label, sp } from 'cc';
import { GameViewController, PlayType } from '../Controller/GameViewController';
const { ccclass, property } = _decorator;

@ccclass('BoyItem')
export class BoyItem extends Component {
    @property(Label)
    private label: Label
    @property(Button)
    private clickNode: Button

    private index: number
    public curState: ItemState
    private spine: sp.Skeleton
    private resultCb: (index: number) => {}
    private gameOverCb: () => void


    protected onLoad(): void {
        this.spine = this.node.getComponent(sp.Skeleton)
    }

    protected onDestroy(): void {
        this.turnOffClick()
    }

    protected onEnable(): void {
        this.stateChanged(ItemState.Init)
    }

    public setCallBack(resultCallBack: (index: number) => {}, gameOverCallBack: () => void) {
        this.resultCb = resultCallBack
        this.gameOverCb = gameOverCallBack
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

    private async win(str: string) {
        this.setText(str)
        await this.playAnimation(animationName.Win)
        await this.playAnimation(animationName.Hit)
    }

    private async end(str: string) {
        this.setText(str)
        this.spine.color = new Color("#3A3131")
        await this.playAnimation(animationName.Win)
        await this.playAnimation(animationName.Death)
        this.gameOverCb()
    }

    private playAnimation(name: string): Promise<void> {
        return new Promise((resolve) => {
            if (!this.spine) {
                resolve()
                return
            }

            this.spine.setAnimation(0, name, false)
            this.spine.setCompleteListener((trackEntry) => {
                if (trackEntry.animation.name === name) {
                    resolve()
                }
            });
        });
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
        this.resultCb(this.index)
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

