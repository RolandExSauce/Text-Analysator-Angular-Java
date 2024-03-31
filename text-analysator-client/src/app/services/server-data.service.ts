
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlphaObj, IReqBody, ServerResponseStruct } from '../utils/types';
import { initedConsonantsObj, initedVowelsObj, modServerAlphaObj } from '../utils/tools';


@Injectable({
  providedIn: 'root',
})
export class ServerDataService {
  apiEndpointUrl = "http://localhost:3002/api/text-analysator"

  constructor(private http: HttpClient) { }
  private vowelsData$ = new BehaviorSubject<IAlphaObj>(initedVowelsObj);
  private consonantsData$ = new BehaviorSubject<IAlphaObj>(initedConsonantsObj);

  //************************************************** */
  public getVowelsData(): Observable<IAlphaObj> {
    return this.vowelsData$.asObservable();
  }

  public setVowelsData(data: IAlphaObj): void {
    this.vowelsData$.next(data);
  }

  //************************************************** */
  public getConsonantsData(): Observable<IAlphaObj> {
    return this.consonantsData$.asObservable();
  }

  public setConsonantsData(data: IAlphaObj): void {
    this.consonantsData$.next(data);
  }

  //set default headers 
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })


  // send post request to analyze string/word 
  getAnalysedAlpha(analyseInput: IReqBody): void {
    let body = JSON.stringify(analyseInput);
    this.http.post<any>(this.apiEndpointUrl, body, {
      headers: this.headers,
      responseType: "json"
    }).subscribe({
      next: (data: ServerResponseStruct[]) => {

        //get which type of data is returned by the server 
        if (data.length === 1 && data[0].VType) {
          // console.log("yes v")
          // console.log("v: ", data[0].VType)
          const serverResInAlpha = modServerAlphaObj(data[0].VType, "V") //integrate server response to alphabet arr
          this.setVowelsData(serverResInAlpha)
        }

        else if (data.length === 1 && data[0].CType) {
          // console.log("yes c")
          // console.log("c: ", data[0].CType)
          const serverResInAlpha = modServerAlphaObj(data[0].CType, "C") //integrate server response to alphabet arr
          this.setConsonantsData(serverResInAlpha)
        }

        else if (data.length === 2 && data[0].VType && data[1].CType) {
          // console.log("yes both")
          // console.log("v: ", data[0].CType)
          // console.log("c: ", data[1].CType)

          const serverResInAlphaForV = modServerAlphaObj(data[0].VType, "V") //integrate server response for vowels to alphabet arr
          const serverResInAlphaForC = modServerAlphaObj(data[1].CType, "C") //integrate server response for consonants to alphabet arr
          this.setVowelsData(serverResInAlphaForV)
          this.setConsonantsData(serverResInAlphaForC)
        }
      }
    })
    //maybe pipe an error here 
    // .pipe(
    //   catchError(this.handleError('addHero', hero))
    // );
  }

}









