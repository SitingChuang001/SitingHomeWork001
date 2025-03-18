import { _decorator, CCInteger, Node, Component, instantiate, } from 'cc';
import { MultipleView } from '../viewComponent/MultipleView';
import { RoundsView } from '../viewComponent/RoundsView';
import { BoyItem, ItemState } from '../viewComponent/BoyItem';
const { ccclass, property } = _decorator;

@ccclass('GameViewController')
export class GameViewController extends Component {
    @property({ type: CCInteger, min: 1, max: 40, step: 1 })
    private resultCount: number
    @property(MultipleView)
    private multipleView: MultipleView
    @property(RoundsView)
    private roundsView: RoundsView
    @property(Node)
    private restartButton: Node
    @property(Node)
    private bouLayout: Node

    private result: string[]
    private opratiors: string[] = ["+", "x"]
    private multiple: number
    private round: number
    private itemsView: Array<BoyItem> = []

    protected onLoad() {
        this.init()
        this.createPrefabs(this.resultCount, this)
    }

    private init() {
        this.restartButton.active = false
        this.multiple = 1
        this.multipleView.setText(this.multiple.toString())
        this.round = 0
        this.roundsView.setText(this.round.toString())
        this.randomResult()
        this.itemsView.forEach((item) => {
            item.stateChanged(ItemState.Init)
        })
    }
    public createPrefabs(length: number, controller: GameViewController) {
        this.itemsView = new Array<BoyItem>(length)
        var firstNode = this.bouLayout.children[0]
        this.itemsView[0] = firstNode.getComponent(BoyItem)
        this.itemsView[0].setIndex(0)
        this.itemsView[0].setCallBack(this.setResult.bind(this), this.gameOver.bind(this))
        for (var i = 1; i < length; i++) {
            let prefabNode = instantiate(firstNode)
            this.bouLayout.addChild(prefabNode)
            this.itemsView[i] = prefabNode.getComponent(BoyItem)
            this.itemsView[i].setIndex(i)
            this.itemsView[i].setCallBack(this.setResult.bind(this), this.gameOver.bind(this))
        }
    }
    public showWin(index: number, str: string) {
        this.itemsView[index].showAnimation(PlayType.Win, str)
    }
    private setMultiple(winText: string) {
        this.multiple += parseInt(winText)
        this.multipleView.setText(this.multiple.toString())
    }

    private setRounds(winText: string) {
        this.roundsView.setText(winText)
    }

    public setResult(index: number) {
        var resultText: string = this.result[0]
        this.result.shift()
        var words = resultText.split("")
        switch (words[0]) {
            case "E":
                this.showEnd(index, resultText)
                break
            case "x":
                this.setMultiple(resultText.split("x")[1])
                this.showWin(index, resultText)
                break
            case "+":
                this.setRounds(resultText.split("+")[1])
                this.showWin(index, resultText)
                break
        }
    }
    public showEnd(index: number, str: string) {
        this.itemsView[index].showAnimation(PlayType.End, str)
        this.itemsView.forEach((item) => {
            item.turnOffClick()
        })
    }
    public gameOver() {
        console.log("Siting")
        this.itemsView.forEach(element => {
            if (element.curState != ItemState.Complete) {
                element.showAnimation(PlayType.Game_Over, this.result[0])
                this.result.shift()
            }
        });
        this.restartButton.active = true
    }


    private randomResult() {
        this.result = new Array(this.resultCount).fill("");
        this.result[this.getRandomNumber(0, this.result.length - 1)] = "END"
        this.result.forEach((element, index) => {
            if (element === "") {
                this.result[index] = this.getRandomString(this.opratiors) + this.getRandomNumber(1, 9).toString();
            }
        });;
    }

    private getRandomNumber(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    private getRandomString(arr: string[]): string {
        return arr[Math.floor(Math.random() * arr.length)];
    }

}

export enum PlayType {
    Win,
    End,
    Game_Over
}

