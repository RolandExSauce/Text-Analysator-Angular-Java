
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, throwError } from 'rxjs';
import { IAlphaObj, IReqBody, ServerResponseStruct } from '../utils/types';
import { initedConsonantsObj, initedVowelsObj, modServerAlphaObj } from '../utils/tools';


@Injectable({
  providedIn: 'root',
})
export class ServerDataService {

  postSub: Subscription | undefined;
  apiEndpointUrl = "http://localhost:3002/api/text-analysator"

  constructor(private http: HttpClient) {
    this.errHandler = this.errHandler.bind(this); //bind error handler to class instance
  }
  private vowelsSubject$ = new BehaviorSubject<IAlphaObj>(initedVowelsObj);
  private consonantsSubject$ = new BehaviorSubject<IAlphaObj>(initedConsonantsObj);
  private errorSubject$ = new BehaviorSubject<string>('');

  //************************************************** */
  public getError(): Observable<string> {
    return this.errorSubject$.asObservable();
  }

  public getVowelsData(): Observable<IAlphaObj> {
    return this.vowelsSubject$.asObservable();
  }

  public setVowelsData(data: IAlphaObj): void {
    this.vowelsSubject$.next(data);
  }

  //************************************************** */
  public getConsonantsData(): Observable<IAlphaObj> {
    return this.consonantsSubject$.asObservable();
  }

  public setConsonantsData(data: IAlphaObj): void {
    this.consonantsSubject$.next(data);
  }

  //set default headers 
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })


  // send post request to analyze string/word 
  getAnalysedAlpha(analyseInput: IReqBody): void {
    let body = JSON.stringify(analyseInput);
    this.postSub = this.http.post<any>(this.apiEndpointUrl, body, {
      headers: this.headers,
      responseType: "json"
    })
      .pipe(
        catchError(this.errHandler)
      )
      .subscribe({
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
        },
      })
  }

  //err handler
  private errHandler(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.status === 0) {
      errMsg = `Error with Client or Network: ${err.message}`
    } else {
      //debugger
      errMsg = `Server-side error: ${err.message}`;
      console.log(errMsg) //for us
    }
    // Emit the error message
    this.errorSubject$.next(errMsg);
    return throwError(() => new Error(`Couldn't fetch from server`));
  }

  //unsubscribe
  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}









