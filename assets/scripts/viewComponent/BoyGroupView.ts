import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { EventTable } from '../EventTable';
import { BoyItem, ItemState } from './BoyItem';
import { GameViewController, PlayType } from '../Controller/GameViewController';

const { ccclass, property } = _decorator;

@ccclass('BoyGroupView')
export class BoyGroupView extends Component {
    private ItemsView: Array<BoyItem> = []

    public createPrefabs(length: number, controller: GameViewController) {
        this.ItemsView = new Array<BoyItem>(length)
        var firstNode = this.node.children[0]
        this.ItemsView[0] = firstNode.getComponent(BoyItem)
        this.ItemsView[0].setIndex(0)
        this.ItemsView[0].setComtroller(controller)
        for (var i = 1; i < length; i++) {
            let prefabNode = instantiate(firstNode)
            this.node.addChild(prefabNode)
            this.ItemsView[i] = prefabNode.getComponent(BoyItem)
            this.ItemsView[i].setIndex(i)
            this.ItemsView[i].setComtroller(controller)
        }
    }

    public init(){
        this.ItemsView.forEach((item)=>{
            item.stateChanged(ItemState.Init)
        })
    }

    public showWin(index: number, str: string) {
        this.ItemsView[index].showAnimation(PlayType.Win, str)
    }


    public showEnd(index: number, str: string) {
        this.ItemsView[index].showAnimation(PlayType.End, str)
        this.ItemsView.forEach((item) => {
            item.turnOffClick()
        })
    }

    public gameOver(result: string[]) {
        this.ItemsView.forEach(element => {
            if (element.curState != ItemState.Complete) {
                element.showAnimation(PlayType.Game_Over,result[0])
                result.shift()
            }
        });
    }
}

