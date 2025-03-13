import { _decorator, CCInteger,Node, Component, } from 'cc';
import { MultipleView } from '../viewComponent/MultipleView';
import { RoundsView } from '../viewComponent/RoundsView';
import { RestartButtonView } from '../viewComponent/RestartButtonView';
import { BoyGroupView } from '../viewComponent/BoyGroupView';
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
    @property(BoyGroupView)
    private boyGroupView: BoyGroupView

    private result: string[]
    private opratiors: string[] = ["+", "x"]
    private multiple: number
    private round: number

    protected onLoad() {
        this.init()
        this.boyGroupView.createPrefabs(this.resultCount, this)
    }

    private init() {
        this.boyGroupView.init()
        this.restartButton.active = false
        this.multiple = 1
        this.multipleView.setText(this.multiple.toString())
        this.round = 0
        this.roundsView.setText(this.round.toString())
        this.randomResult()
    }

    private setMultiple(winText: string) {
        this.multiple *= parseInt(winText)
        this.multipleView.setText(this.multiple.toString())
    }

    private setRounds(winText: string) {
        this.roundsView.setText(winText)
    }

    public gameOver() {
        this.boyGroupView.gameOver(this.result)
        this.restartButton.active = true
    }

    public setResult(index: number) {
        var resultText: string = this.result[0]
        this.result.shift()
        var words = resultText.split("")
        switch (words[0]) {
            case "E":
                this.boyGroupView.showEnd(index, resultText)
                break
            case "x":
                this.setMultiple(resultText.split("x")[1])
                this.boyGroupView.showWin(index, resultText)
                break
            case "+":
                this.setRounds(resultText.split("+")[1])
                this.boyGroupView.showWin(index, resultText)
                break
        }
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

