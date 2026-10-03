import { Observer } from "./observer";

export class Model{

    private _count:number = 0;
    private observers: Observer[] = [];

    get count(){
        return this._count;
    }

    set count(c: number){
       this._count = c;
       this.notifyObservers();
    }

    public addObserver(o: Observer): void{
        this.observers.push(o);
        this.notifyObservers();
    }

    
    private notifyObservers(): void{
        this.observers.forEach(observer => observer.update()); // Call update function for all observers
    }

}
