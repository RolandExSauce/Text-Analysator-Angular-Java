import { ServerDataService } from './../services/server-data.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IAlphaObj } from '../utils/types';
import { ClientDataService } from '../services/client-data.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'display-result',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, //does dispaly-result component actually needs httpModule ? 🤔🤔, importing anyway cuz of ng test warning
  ],
  templateUrl: './display-result.component.html',
  styleUrl: './display-result.component.css'
})
export class DisplayResultComponent implements OnInit {

  constructor(private clientDataService: ClientDataService, private ServerDataService: ServerDataService) { } //injecting the services

  // vowelsArrObjSetByService: IAlphaObj[] = [];
  // consonantsArrObjSetByService: IAlphaObj[] = [];
  // <div class="col" *ngFor="let obj of vowelsArrObjSetByService | keyvalue"> working for both  🤔
  vowelsArrObjSetByService: IAlphaObj = {};
  consonantsArrObjSetByService: IAlphaObj = {};

  vowelDataSub: Subscription | undefined;
  consonantDataSub: Subscription | undefined;


  ngOnInit(): void {
    //subscribe to service 
    this.vowelDataSub = this.clientDataService.getVowelsData().subscribe({
      next: (data) => {
        //console.log("vowel data in display-result: ", this.vowelsArrObjSetByService)
        if (data) {
          this.vowelsArrObjSetByService = data
        }
      }
    });

    this.consonantDataSub = this.clientDataService.getConsonantsData().subscribe({
      next: (data) => {
        //console.log("vowel data in display-result: ", this.vowelsArrObjSetByService)
        if (data) {
          this.consonantsArrObjSetByService = data
        }
      }
    });

    //Subscription for server requests ****************************************************************** */

    this.vowelDataSub = this.ServerDataService.getVowelsData().subscribe({
      next: (data) => {
        // console.log("server data v in send display-result: ", data)
        if (data) {
          this.vowelsArrObjSetByService = data
        }

      }
    });

    this.consonantDataSub = this.ServerDataService.getConsonantsData().subscribe({
      next: (data) => {
        // console.log("server data c in send display-result: ", data)
        if (data) {
          this.consonantsArrObjSetByService = data
        }
      }
    });

  }

  //unsubscribe on destroy
  ngOnDestroy(): void {
    this.vowelDataSub?.unsubscribe();
    this.consonantDataSub?.unsubscribe();
  }


}
