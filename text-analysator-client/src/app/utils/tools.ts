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

//function to generate the scan condition
const genScanCondition = ($: string, scanType: string) => scanType === "C" ? ("aeiou").indexOf($) === -1 : ("aeiou").indexOf($) !== -1;
//function to count vowels and counsonants silmutaneously 
const countLetters = (providedString: string, scanType: string) => {
    const input = providedString.toLowerCase();
    const letterObj = decomposedAlphabet(scanType)
    for (const char of input) {
        for (const [key, value] of Object.entries(letterObj)) {
            if (genScanCondition(char, scanType) && char === key) {
                letterObj[key]++;
            }
        }
    }
    // console.log("new letter obj: ", letterObj) //can be either vowels or consonants
    return letterObj;
}


// //count vowels func
// const countVowels = (providedString: string) => {
//     const input = providedString.toLowerCase();
//     const vowelObj = decomposedAlphabet("V")

//     for (const char of input) {
//         for (const [key, value] of Object.entries(vowelObj)) {
//             if ((("aeiou").indexOf(char)) !== -1 && char === key) {
//                 vowelObj[key]++;
//             }
//         }
//     }
//     // console.log("new vowel obj: ", vowelObj)
//     return vowelObj;
// }

// //count consonants func
// const countConsonants = (providedString: string) => {
//     const input = providedString.toLowerCase();
//     const consonantObj = decomposedAlphabet("C")
//     // console.log("decomposed c: ", consonantObj)
//     for (const char of input) {
//         for (const [key, value] of Object.entries(consonantObj)) {
//             if ((("aeiou").indexOf(char)) === -1 && char === key) {
//                 consonantObj[key]++;
//             }
//         }
//     }
//     //console.log("new consonant obj: ", consonantObj)
//     return consonantObj;
// }

//when we receive server data we will update it in our alphabets objects
const modServerAlphaObj = (serverAlphaObj: IAlphaObj, alphaType: string) => {
    const alphaObj = decomposedAlphabet(alphaType)
    console.log("key of serverAlpha: ", serverAlphaObj)
    for (const key in serverAlphaObj) {
        if (serverAlphaObj.hasOwnProperty(key)) {
            if (!(key in alphaObj) || alphaObj[key] === 0) { //if key is not present in alphaObj and vlaue at given key not 
                //is zero, update it with the value from server res
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
    // countConsonants,
    // countVowels,
    countLetters,
    modServerAlphaObj,
    validateInput,
    initedVowelsObj,
    initedConsonantsObj
} 