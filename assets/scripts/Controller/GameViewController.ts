import { _decorator, CCInteger, Component, Node } from 'cc';
import { MultipleView } from '../viewComponent/MultipleView';
import { RoundsView } from '../viewComponent/RoundsView';
import { RestartButtonView } from '../viewComponent/RestartButtonView';
import { BoyGroupView } from '../viewComponent/BoyGroupView';
const { ccclass, property } = _decorator;

@ccclass('GameViewController')
export class GameViewController extends Component {
    @property(CCInteger)
    private resultCount: number
    @property(MultipleView)
    private multipleView: MultipleView
    @property(RoundsView)
    private roundsView: RoundsView
    @property(RestartButtonView)
    private restartButtonView: RestartButtonView
    @property(BoyGroupView)
    private boyGroupView: BoyGroupView

    private result : string[]

    private init(){
        this.randomResult()
    }

    private setMultiple(){

    }

    private setRounds(){

    }

    private gameOver(){

    }

    private setResult(){

    }

    private randomResult(){
        this.result = new String[this.resultCount]
        //TODO end隨機塞個位置 剩下用[x.+] [1-9]隨機搭配塞值
    }
}

export enum GameState{
    Init,
    start,
    End,
    Game_Over
}

export enum PlayType{
    Win,
    End,
    Game_Over
}

