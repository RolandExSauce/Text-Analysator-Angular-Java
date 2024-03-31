import { ServerDataService } from './services/server-data.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TogglesComponent } from './toggles/toggles.component';
import { SendTextComponent } from './send-text/send-text.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,//does app component actually needs httpModule ? 🤔🤔, importing anyway cuz of ng test warning
    RouterOutlet,

    //import components
    TogglesComponent,
    SendTextComponent,
    DisplayResultComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

//app component
export class AppComponent implements OnInit {
  programTitle = 'Text Analysator';
  errMsg: string = '';
  errSub: Subscription | undefined;

  constructor(private serverDataService: ServerDataService) { }
  ngOnInit(): void {
    //subscribe to error
    this.errSub = this.serverDataService.getError().subscribe({
      next: (errMessage) => {
        console.log("errMessage: ", errMessage)
        this.errMsg = errMessage
        //delete err message after 5 seconds 
        setTimeout(() => {
          this.errMsg = '';
        }, 5000);
      }
    });
  }

  ngOnDestroy(): void {
    this.errSub?.unsubscribe();
  }


  //handle emited event(toggle switch event) from child 
  scriptChecked: boolean = false;
  onScriptCheckedChange(scriptChecked: boolean) {
    this.scriptChecked = scriptChecked;
    // console.log("in parent scriptChecked: ", this.scriptChecked)
  }

  //handle emited event(radio selection) from child 
  selectedRadioOption: string = 'V';
  onRadioSelectedChange(selectedRadioOption: string) {
    // console.log("in parent selectedRadioOption: ", selectedRadioOption)
    this.selectedRadioOption = selectedRadioOption
  }

}
