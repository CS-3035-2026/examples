import {
    SKButton,
    SKContainer,
    SKElementProps,
} from "../../simplekit/src/imperative-mode";
import { Controller } from "./controller";
import { Model } from "./model";
import { Observer } from "./observer";

export class ViewBottom extends SKContainer implements Observer{
    
    private _model: Model;
    randomizeButton: SKButton = new SKButton({ text: "?" });

    constructor(props: SKElementProps, model: Model){
        super(props); // Super call since we extend SKContainer
        this._model = model;
        this.addChild(this.randomizeButton);
    }

    set model(m: Model){
        this._model = m;
    }

    // Link the controller and button event listener
    setButtonEvent(c: Controller){
        this.randomizeButton.addEventListener("action", () => {
            c.buttonPress();
        });
    }

    // update() from Observer
    update(): void{
        this.randomizeButton.text = this._model.count.toString(); // Update the text in the button from model
    }  

}
