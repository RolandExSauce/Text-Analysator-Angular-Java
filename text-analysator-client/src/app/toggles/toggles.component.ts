import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ClientDataService } from '../services/client-data.service';
import { ServerDataService } from '../services/server-data.service';
import { initedConsonantsObj, initedVowelsObj } from '../utils/tools';


@Component({
  selector: 'toggles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggles.component.html',
  styleUrl: './toggles.component.css'
})

//toggle component for switching between server/client script, choosing vowels/consonant/both scan
export class TogglesComponent {

  //using dependency injection to inject services
  constructor(private clientDataService: ClientDataService, private serverDataService: ServerDataService) { }

  @Output() radioSelectionChange = new EventEmitter<string>(); //prop with output decorator, to emit radio select event to parent
  @Output() scriptCheckedChange = new EventEmitter<boolean>(); //prop with output decorator, to emit toggle switch event to parent
  scriptChecked = false //track toggle switch of which script to use 
  scriptText = "ClientScript on" //text to toggle alongside with switch button

  //track the selected event 
  selectedRadioOption = 'V';

  //array containing options for scanning, either vowel or consonants or both
  radioSelectOptions = [
    {
      text: "Scan vowels",
      value: "V"
    },
    {
      text: "Scan consonants",
      value: "C"
    },
    {
      text: "Scan both",
      value: "CV"
    }
  ]

  //will keep track of the toggle switch
  handleScriptChange() {
    this.scriptChecked = !this.scriptChecked
    // console.log("scriptChecked: ", this.scriptChecked)
    this.scriptText = this.scriptChecked ? "ServerScript on" : "ClientScript on" //dinamically change text next to scriptText
    this.scriptCheckedChange.emit(this.scriptChecked); //emit event 
  }

  //handle change event for the radio buttons, VorC = Vowels or Consonant
  radioChangeHandlerVorC(e: Event) {
    const _target = e.target as EventTarget;
    const _targetHTML = _target as HTMLInputElement; // cast HTMLInputElement

    // console.log("html value: ", _targetHTML.value)
    this.selectedRadioOption = _targetHTML.value; // access value prop and set it to our variable
    this.radioSelectionChange.emit(this.selectedRadioOption) //emit event

    //reset on radio change ?
    if (this.selectedRadioOption === "V") {
      this.clientDataService.setConsonantsData(initedConsonantsObj)
    }
    else if (this.selectedRadioOption === "C") {
      this.clientDataService.setVowelsData(initedVowelsObj)
    }
    //last option:
  }

  //css for some effects on switch toggle 
  get cssClasses() {
    return {
      'text-muted': !this.scriptChecked,
      'toggle-icons': this.scriptChecked,
    }
  }

}
