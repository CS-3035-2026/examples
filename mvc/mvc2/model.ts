import { Subject } from "./observer";

export class Model extends Subject {
  private _count = 0;

  get count() {
    return this._count;
  }

  increment() {
    this._count++;
    this.notifyObservers();
  }
}
