import {
    SKContainer,
    SKElementProps,
    SKLabel,
} from "../../simplekit/src/imperative-mode";
import { Model } from "./model";
import { Observer } from "./observer";

export class ViewTop extends SKContainer implements Observer{

    private _model: Model;
    
    constructor(props: SKElementProps, model: Model){
        super(props); // Super call since we extend SKContainer
        this._model = model;
    }

    set model(m: Model){
        this._model = m;
    }

    // update() from Observer
    // Function creates squares based on model.count
    update(): void{
        const elements = this._model.count;
        this.clearChildren();
        for (let i = 0; i < elements; i++){
            const square = new SKLabel({width: 87.5, height: 87.5, text: (i+1).toString()});
            square.fill = `hsl(${Math.random() * 360} 100% 50%)`;
            this.addChild(square);
        }
    }

}
