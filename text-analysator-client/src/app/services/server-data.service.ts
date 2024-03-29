
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlpha, IReqBody } from '../utils/types';
import { initConsonantsArrObj, initVowelsArrObj } from '../utils/tools';



@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  apiEndpointUrl = "http://localhost:3002/api/text-analysator"

  constructor(private http: HttpClient) { }


  // private vowelsData$ = new BehaviorSubject<IAlpha[]>(initVowelsArrObj);
  // private consonantsData$ = new BehaviorSubject<IAlpha[]>(initConsonantsArrObj);

  // public getVowelsData(): Observable<any> {
  //   return this.vowelsData$.asObservable();
  // }

  // public setVowelsData(data: IAlpha[]): void {
  //   this.vowelsData$.next(data);
  // }
  // public getConsonantsData(): Observable<any> {
  //   return this.consonantsData$.asObservable();
  // }

  // public setConsonantsData(data: IAlpha[]): void {
  //   this.consonantsData$.next(data);
  // }



  // send post request to analyze string/word 
  getAnalysedAlpha(analyseInput: IReqBody): Observable<any> {
    let body = JSON.stringify(analyseInput);
    return this.http.post<any>(this.apiEndpointUrl, body, {

      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      ),

      responseType: "json"
    })
    // .pipe(
    //   catchError(this.handleError('addHero', hero))
    // );
  }

}









