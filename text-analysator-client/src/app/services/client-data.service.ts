import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlpha } from '../utils/types';
import { initConsonantsArrObj, initVowelsArrObj } from '../utils/tools';

@Injectable({
  providedIn: 'root' //make service available through the entire app
})

//service for making decrypted data available to other components (mainly display-result-component)
export class ClientDataService {

  //will be used to initialize the behaviour subjects

  private vowelsData$ = new BehaviorSubject<IAlpha[]>(initVowelsArrObj);
  private consonantsData$ = new BehaviorSubject<IAlpha[]>(initConsonantsArrObj);

  public getVowelsData(): Observable<any> {
    return this.vowelsData$.asObservable();
  }

  public setVowelsData(data: IAlpha[]): void {
    this.vowelsData$.next(data);
  }
  public getConsonantsData(): Observable<any> {
    return this.consonantsData$.asObservable();
  }

  public setConsonantsData(data: IAlpha[]): void {
    this.consonantsData$.next(data);
  }

  
}





