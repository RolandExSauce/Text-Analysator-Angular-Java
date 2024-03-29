
# The following units test for the angular app were done:

 angular project created using standalone components

1.)
component: toggles.component.ts

 handleScriptChange() {
   //.... console.log to see if scriptChecked variable tracked/event emited ? => check in parent
  }

    onScriptCheckedChange(scriptChecked: boolean) {
    this.scriptChecked = scriptChecked;
    // console.log("in parent: ", this.scriptChecked)
  }

radio buttons change event detected or not:
radioChangeHandlerVorC(e: Event) {
   //... console.log("radio button value: ", value)
  }

# --------------------------------------------------------------------------------------------------------------------
2.)
component: app.component.ts, send-text.component.ts, toggles.component.ts

<send-text> component depends on "scriptChecked" as well, used Input and to bind prop from app c to send-tex c
tested to see if value changed as well: 
button was also depending on scriptChecked boolean therefore it was ideal to bind this boolean prop to toggle the visibility:

<div *ngIf="scriptChecked">
          <button type="submit" class="btn btn-primary btn-lg ml-3" 

and this function bind to the button to actually see the scriptChecked/selected value value:         
  test() {
    console.log("in sendtext component, scriptChecked: " + this.scriptChecked)
    console.log("in sendtext component, selectedOption: " + this.selectedRadioOption)
  }

same proceeding for pro "selectedRadioOption"

# ----------------------------------------------------------------------------------------------------------------
3.)
writing and testing vowels and consonants function implemented with typescript with send-text-component.ts: 

/utils/tools.ts => functions almost have same logic as the backend but they update everything from inside an array of object

impleming handleChangeInput function with these written functions, also validating input


# -----------------------------------------------------------------------------------------------------------------
4.)
displaying ouput: display-result.component, first tried with event, didnt work well => implemented client-data.service

=> some fine tuning on css and overall


# Server Side tests ------------------------------------------------------------------------------------------------------------------

1.) spring boot maven project created using: https://start.spring.io/


* changing default landing page with some html and css

* creating a simple controller, testing request with postman, sysout sent params

* implementing server data service/httpclient, testing request from angular, sysout sent params

* implementing vowels consonants functions in a service class 

