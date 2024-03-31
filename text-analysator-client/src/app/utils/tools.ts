import { IAlphaObj } from "./types";
import { AbstractControl, ValidationErrors } from "@angular/forms";


//return either an alphabet object with vowels or consonants 
const decomposedAlphabet = (charTypes: string): IAlphaObj => {
    //unpack string in array, then filter for vowel/consonants
    const alphabetArr = [...'abcdefghijklmnopqrstuvwxyz'].filter((elem) => {
        return charTypes === 'C' ? ("aeiou").indexOf(elem) == -1 : ("aeiou").indexOf(elem) !== -1
    })
    const alphaArrObj = alphabetArr.reduce((acc, currentLetter) => ({ ...acc, [currentLetter]: 0 }), {} as IAlphaObj) //turning array to object with reduce
    //console.log("converted to obj: ", newAlphaArrObj)
    return alphaArrObj;
}

//init the arrays, will be used by services as well
const initedVowelsObj = decomposedAlphabet("V");
const initedConsonantsObj = decomposedAlphabet("C");

//count vowels func
const countVowels = (providedString: string) => {
    const input = providedString.toLowerCase();
    const vowelObj = decomposedAlphabet("V")

    for (const char of input) {
        for (const [key, value] of Object.entries(vowelObj)) {
            if ((("aeiou").indexOf(char)) !== -1 && char === key) {
                vowelObj[key]++;
            }
        }
    }
    // console.log("new vowel obj: ", vowelObj)
    return vowelObj;
}

//count consonants func
const countConsonants = (providedString: string) => {
    const input = providedString.toLowerCase();
    const consonantObj = decomposedAlphabet("C")
    // console.log("decomposed c: ", consonantObj)
    for (const char of input) {
        for (const [key, value] of Object.entries(consonantObj)) {
            if ((("aeiou").indexOf(char)) === -1 && char === key) {
                consonantObj[key]++;
            }
        }
    }
    //console.log("new consonant obj: ", consonantObj)
    return consonantObj;
}

//when we receive server data we will update it in our alphabets objects
const modServerAlphaObj = (serverAlphaObj: IAlphaObj, alphaType: string) => {
    const alphaObj = decomposedAlphabet(alphaType)
    for (const key in serverAlphaObj) {
        // console.log("key of serverAlpha: ", key)
        if (serverAlphaObj.hasOwnProperty(key)) {
            if (!(key in alphaObj) || alphaObj[key] === 0) {
                alphaObj[key] = serverAlphaObj[key];
            }
        }
    }
    // console.log("modified alphaObj: ", alphaObj)
    return alphaObj;
}


//custom validator for typed input
const validateInput = (control: AbstractControl<string>): ValidationErrors | null => {
    const input = control.value?.toLowerCase()
    let regex = /^[a-zA-Z]+$/;

    if (!input) {
        return null
    }
    else {
        //check if only letters are in string
        const onlyLettersAllowed = regex.test(input)
        return !onlyLettersAllowed ? {
            invalidInput: true // error name: invalidInput
        } : null
    }
}


export {
    decomposedAlphabet,
    countConsonants,
    countVowels,
    modServerAlphaObj,
    validateInput,
    initedVowelsObj,
    initedConsonantsObj
} 