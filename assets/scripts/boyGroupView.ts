import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { boyPrefab } from './boyPrefab';
import { eventTable } from './eventTable';
const { ccclass, property } = _decorator;

@ccclass('boyGroupView')
export class boyGroupView extends Component {
    @property(Prefab)
    private boyPrefab: Prefab
    private result: Array<string> = ['x2', 'x2', '+1', 'end', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2']
    private prefabViews: Array<boyPrefab> = []
    start() {
        director.on(eventTable.Item_Click, this.setResult, this)
        director.on(eventTable.Show_End_Complete, this.gameOver, this)
        director.on(eventTable.All_Init,this.init,this)
        this.createPrefabs()
    }

    private createPrefabs() {
        for (var i = 0; i < this.result.length; i++) {
            let prefabNode = instantiate(this.boyPrefab)
            this.node.addChild(prefabNode)
            this.prefabViews.push(prefabNode.getComponent(boyPrefab))
            this.prefabViews[i].setIndex(i)
        }
    }

    protected onEnable(): void {
        this.init()
    }

    private init() {
        this.result = ['x2', 'x2', '+1', 'end', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2', 'x2']
    }

    private setResult(index: number) {
        var words = this.result[0].split('')
        switch (words[0]) {
            case "e":
                this.showEnd(index)
                break
            case "x":
                this.showMultipleWin(index, this.result[0], parseInt(words[1]))
                break
            case "+":
                this.showRoundsWin(index, this.result[0], parseInt(words[1]))
                break
        }
        this.result.shift()
    }

    private showMultipleWin(index: number, result: string, winNum: number) {
        this.prefabViews[index].win(result)
        director.emit(eventTable.Multiple_Win, winNum)
    }

    private showRoundsWin(index: number, result: string, winNum: number) {
        this.prefabViews[index].win(result)
        director.emit(eventTable.Rounds_Win, winNum)
    }

    private showEnd(index: number) {
        this.prefabViews[index].end("END")
    }

    private gameOver() {
        director.emit(eventTable.Game_Over)
        this.prefabViews.forEach(element => {
            if (!element.allReadyWin) {
                if (this.result.length > 0)
                    element.setText(this.result[0])
                this.result.shift()
            }
        });
    }
}

