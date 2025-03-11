import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('boyPrefab')
export class boyPrefab extends Component {
    public allReadyWin: boolean = false
    private spine:sp.Skeleton
    start() {
        this.spine = this.node.getComponent(sp.Skeleton)
    }
    init() {
        this.allReadyWin = false
    }89
    update(deltaTime: number) {

    }
}

