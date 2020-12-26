import { Injectable } from '@angular/core';

@Injectable()
export class LoadingIndicatorService {

  private _loading: boolean = false;

  get loading(): boolean {
      return this._loading;
  }

  public onRequestStarted(): void {
      setTimeout(() => {
        this._loading = true;
      }, 100)
      
  }

  public onRequestFinished(): void {
    setTimeout(() => {
      this._loading = false;
    }, 100)
  }
  
}
