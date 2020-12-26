import { Injectable } from '@angular/core';

@Injectable()
export class LoginModalService {

  private _showing: boolean = false;

  get isShowing(): boolean {
      return this._showing;
  }

  show(): void {
      this._showing = true;
  }

  hide(): void {
      this._showing = false;
  }
  
}
