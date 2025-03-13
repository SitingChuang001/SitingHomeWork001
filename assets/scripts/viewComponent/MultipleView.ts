import { _decorator, Component, director, Label, Node } from 'cc';
import { EventTable } from '../EventTable';
const { ccclass, property } = _decorator;

@ccclass('MultipleView')
export class MultipleView extends Component {
    @property(Label)
    private numLabel: Label

    public setText(winText: string) {
        this.numLabel.string = winText
    }
}

