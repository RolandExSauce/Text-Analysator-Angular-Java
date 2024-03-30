import { IAlphaObj } from "./types";
import { AbstractControl, ValidationErrors } from "@angular/forms";


//return either an alphabet object with vowels or consonants or mixed 
const decomposedAlphabet = (charTypes: string): IAlphaObj => {
    //unpack string in array, then filter for vowel/consonants or mixed
    const alphabetArr = [...'abcdefghijklmnopqrstuvwxyz'].filter((elem) => {
        return charTypes === 'C' ? ("aeiou").indexOf(elem) == -1 : charTypes === 'V' ? ("aeiou").indexOf(elem) !== -1 : elem
    })
    const alphaArrObj = alphabetArr.reduce((acc, currentLetter) => ({ ...acc, [currentLetter]: 0 }), {} as IAlphaObj) //turning array to object with reduce

    // const alphaArrObj = alphabetArr.reduce((acc, currentLetter) => {
    //     // console.log("accumulator: ", acc)
    //     // console.log("current letter: ", currentLetter)
    //     return { ...acc, [currentLetter]: 0 };
    // }, {} as IAlphaObj); //accumulator will be initialized as an Object

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

//count both vowels and consonants
const countVorC = (providedString: string) => {
    const input = providedString.toLowerCase();
    const alphaObj = decomposedAlphabet("CV")

    for (const char of input) {
        for (const [key, value] of Object.entries(alphaObj)) {
            // console.log(`${key}: ${value}`);
            if (char === key) {
                alphaObj[key]++;
            }
        }
    }
    //filter objects, because they are converted to an array of type [string, number][], we use Object.fromEntries to convert them back to objects
    const asArrayAlphaObj = Object.entries(alphaObj);
    const newVowelObj = Object.fromEntries(asArrayAlphaObj.filter(([key, value]) => "aeiou".indexOf(key) !== -1))
    const newConsonantObj = Object.fromEntries(asArrayAlphaObj.filter(([key, value]) => "aeiou".indexOf(key) === -1))
    return [newVowelObj, newConsonantObj]; //return different array because we still need to set the data individually in the service also to render an appropriate display view
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

//to separate alphabets for scanType "CV"
const separateObjsVandC = (obj: IAlphaObj) => {
    let vowelsObj: IAlphaObj = {};
    let consonantsObj: IAlphaObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (['a', 'e', 'i', 'o', 'u'].includes(key)) {
            vowelsObj[key] = value;
        } else {
            consonantsObj[key] = value;
        }
    }
    return { vowelsObj, consonantsObj };
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
    countVowels, countVorC,
    modServerAlphaObj,
    validateInput,
    separateObjsVandC,
    initedVowelsObj,
    initedConsonantsObj
} 