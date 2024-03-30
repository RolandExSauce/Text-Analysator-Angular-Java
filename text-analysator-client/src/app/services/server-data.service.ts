
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlphaObj, IReqBody } from '../utils/types';
import { initedConsonantsObj, initedVowelsObj, modServerAlphaObj, separateObjsVandC } from '../utils/tools';



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
      next: (data) => {
        // console.log("data after post: ", data)
        for (const [key, value] of Object.entries(data)) {
          // console.log(`in post, key:${key}| in post, value: ${value}`);
          if (key === "VType") {
            const serverResInAlpha = modServerAlphaObj(data, "V") //integrate server response to alphabet arr
            delete serverResInAlpha['VType'];
            this.setVowelsData(serverResInAlpha)
          }

          else if (key === "CType") {
            const serverResInAlpha = modServerAlphaObj(data, "C")
            delete serverResInAlpha['CType'];
            this.setConsonantsData(serverResInAlpha)

          }

          else {
            //data is mixed here, cuz server sends a map with both mixed
            const serverResInAlpha = modServerAlphaObj(data, "CV")
            delete serverResInAlpha['CVType'];
            const { vowelsObj, consonantsObj } = separateObjsVandC(serverResInAlpha);
            this.setVowelsData(vowelsObj)
            this.setConsonantsData(consonantsObj)
          }

        }
      }
    })
    //maybe pipe an error here 
    // .pipe(
    //   catchError(this.handleError('addHero', hero))
    // );
  }

}









