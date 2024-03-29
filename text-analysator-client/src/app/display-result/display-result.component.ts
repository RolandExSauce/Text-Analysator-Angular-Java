import { ServerDataService } from './../services/server-data.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IAlpha } from '../utils/types';
import { ClientDataService } from '../services/client-data.service';

@Component({
  selector: 'display-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-result.component.html',
  styleUrl: './display-result.component.css'
})
export class DisplayResultComponent implements OnInit {

  constructor(private clientDataService: ClientDataService, private ServerDataService: ServerDataService) { } //inject service

  //will be updated as soon is data is loaded 
  vowelsArrObjSetByService: IAlpha[] = [];
  consonantsArrObjSetByService: IAlpha[] = [];

  ngOnInit(): void {

    //subscribe to data update from the service 
    this.clientDataService.getVowelsData().subscribe({
      next: (data) => {
        // console.log("data in display service: ", data)
        this.vowelsArrObjSetByService = data
      }
    });

    this.clientDataService.getConsonantsData().subscribe({
      next: (data) => {
        this.consonantsArrObjSetByService = data;
      }
    });


    //FIXME: Get data here
    // this.ServerDataService.getConsonantsData().subscribe({
    //   next: (data) => {
    //     console.log("server data in send display component: ", data)
    //     this.consonantsArrObjSetByService = data;

    //   }
    // });







    // this.ServerDataService.getAnalysedAlpha().subscribe({
    //   next: (data) => {
    //     this.consonantsArrObjSetByService = data;
    //   }
    // });





  }
}
