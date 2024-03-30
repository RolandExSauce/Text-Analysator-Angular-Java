import { HttpClientModule } from '@angular/common/http';
import { ServerDataService } from './../services/server-data.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { countConsonants, countVorC, countVowels, initedConsonantsObj, initedVowelsObj, validateInput } from '../utils/tools';
import { ClientDataService } from '../services/client-data.service';


@Component({
  selector: 'send-text',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, //does send-text component actually needs httpModule ? 🤔🤔, importing anyway cuz of ng test warning
    ReactiveFormsModule
  ],
  templateUrl: './send-text.component.html',
  styleUrl: './send-text.component.css',
})

//component to get input and either send server req or use client script to analyze 
export class SendTextComponent {

  MAX_INPUT_LENGTH = 5000; //max length for string which will be provided, lets just go with 5000
  MAX_INPUT_LENGTH_MSG = `You exceeded the maximum limit of 5000 characters`
  ONLY_LETTERS = `Only alphabet letters are allowed!`
  INPUT_REQUIRED = `Please provide some input`

  //using dependency injection to inject services
  constructor(private clientDataService: ClientDataService, private serverDataService: ServerDataService) { }

  //scriptChecked ? => server req
  @Input() scriptChecked: boolean = false; //this prop will be passed to parent,
  @Input() selectedRadioOption: string = 'V'


  //dynamically set placeholder text
  get dynamicPlaceHolderTxt(): string {
    return this.scriptChecked
      ? "ServerScript active, enter some input and send a request"
      : "ClientScript active, just type in some text";
  }

  //provided string/word by user
  toAnalyseStr = new FormControl('', [Validators.required, Validators.maxLength(this.MAX_INPUT_LENGTH), validateInput]);

  //when user starts typing
  handleInputChange(e: Event) {
    //reset if no values provided
    if (!e) {
      this.clientDataService.setVowelsData(initedVowelsObj)
      this.clientDataService.setConsonantsData(initedConsonantsObj)
    }

    //only client side script will be launched as soon as the user is typing
    if (!this.scriptChecked) {
      if (this.selectedRadioOption === "V") {
        const arrVowels = countVowels(this.toAnalyseStr.value as string)
        // console.log(arrVowel)
        this.clientDataService.setVowelsData(arrVowels) //update behaviour subject
      }

      else if (this.selectedRadioOption === "C") {
        const arrConsonants = countConsonants(this.toAnalyseStr.value as string)
        this.clientDataService.setConsonantsData(arrConsonants)
      }
      
      else {
        const [arrV, arrC] = countVorC(this.toAnalyseStr.value as string) //will return 2 arrays
        this.clientDataService.setVowelsData(arrV)
        this.clientDataService.setConsonantsData(arrC)
      }
    }
  }

  //send backend post request when serverScript on
  sendRequest() {
    if (this.scriptChecked) {
      this.serverDataService
        .getAnalysedAlpha({
          inputProvided: String(this.toAnalyseStr.value),
          scanType: this.selectedRadioOption
        })
    }
  }
}
