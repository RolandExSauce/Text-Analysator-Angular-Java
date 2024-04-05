import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlphaObj } from '../utils/types';
import { initedConsonantsObj, initedVowelsObj } from '../utils/tools';

@Injectable({
  providedIn: 'root' //make service available through the entire app
})

//service for making decrypted data available to other components (mainly display-result-component)
export class ClientDataService {

  //initialize the behaviour subjects
  private vowelsData$ = new BehaviorSubject<IAlphaObj>(initedVowelsObj);
  private consonantsData$ = new BehaviorSubject<IAlphaObj>(initedConsonantsObj);

  public getVowelsData(): Observable<IAlphaObj> {
    return this.vowelsData$.asObservable();
  }

  public setVowelsData(data: IAlphaObj): void {
    this.vowelsData$.next(data);
  }
  public getConsonantsData(): Observable<IAlphaObj> {
    return this.consonantsData$.asObservable();
  }

  public setConsonantsData(data: IAlphaObj): void {
    this.consonantsData$.next(data);
  }

}





