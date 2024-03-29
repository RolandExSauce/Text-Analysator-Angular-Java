import { IAlpha } from "./types";
import { AbstractControl, ValidationErrors } from "@angular/forms";


//return either an alphabet array object with vowels or consonants or mixed 
const decomposedAlphabet = (charTypes: string): IAlpha[] => {
    //unpack array, and convert letters to uppercase (just because it looks nicer on the UI), then either return array of consonants or vowels objects or leave everything as it is
    const alphabetArr = [...'abcdefghijklmnopqrstuvwxyz'].map((letter) => letter.toUpperCase()).filter((elem) => {
        return charTypes === 'C' ? ("AEIOU").indexOf(elem) == -1 : charTypes === 'V' ? ("AEIOU").indexOf(elem) !== -1 : elem
    })
    return alphabetArr.map((str) => ({ "letter": str, "count": 0 })); //map through array and return a new array of objects, with name of letter and a count prop (keep track of occurences)
}

//init the arrays
const initVowelsArrObj = decomposedAlphabet("V");
const initConsonantsArrObj = decomposedAlphabet("C");

//function to count vowels 
const countVowels = (providedString: string) => {
    const input = providedString.toLowerCase();
    const vowelArr = decomposedAlphabet("V")
    for (let i = 0; i < input.length; i++) {
        vowelArr.forEach((vowelObj) => {
            let { letter, count } = vowelObj;
            if (input[i] === letter.toLowerCase()) {
                vowelObj.count++
            }
        })
    }
    //console.log("new vowel arr: ", vowelArr)
    return vowelArr;
}

//function to count consonants
const countConsonants = (providedString: string) => {
    const input = providedString.toLowerCase();
    const consonantArr = decomposedAlphabet("C")
    for (let i = 0; i < input.length; i++) {
        const currentChar = input[i];
        consonantArr.forEach((consonantObj) => {
            if ((("aeiou").indexOf(currentChar)) == -1 && currentChar === consonantObj.letter.toLowerCase()) {
                consonantObj.count++
            }
        })
    }
    //console.log("new consonant arr: ", consonantArr)
    return consonantArr;
}

//count both vowels and consonants
const countVorC = (providedString: string) => {
    const input = providedString.toLowerCase();
    const alphaArr = decomposedAlphabet("CV")
    for (let i = 0; i < input.length; i++) {
        alphaArr.forEach((lettObj) => {
            let { letter, count } = lettObj;
            if (input[i] === letter.toLowerCase()) {
                lettObj.count++
            }
        })
    }
    //console.log("the entire alphabet: ", alphaArr)
    const vowelArr = alphaArr.filter(elem => ("aeiou").indexOf(elem.letter.toLowerCase()) !== -1)
    const consonantArr = alphaArr.filter(elem => ("aeiou").indexOf(elem.letter.toLowerCase()) == -1)
    return [vowelArr, consonantArr]; //return different array because we still need to set the data individually in the service also to render an appropriate display view
}

//custom validator for typed input
function validateInput(control: AbstractControl<string>): ValidationErrors | null {
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



export { decomposedAlphabet, countConsonants, countVowels, countVorC, validateInput, initVowelsArrObj, initConsonantsArrObj } 