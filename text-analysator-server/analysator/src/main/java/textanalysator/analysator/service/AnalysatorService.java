package textanalysator.analysator.service;

import org.springframework.stereotype.Service;
import lombok.Data;
import java.util.*;

@Service
@Data
public class AnalysatorService {

    // function to generate the scan condition
    public boolean genScanCondition(char $, String scanType) {
        // return Objects.equals(scanType, "C") ? ("aeiou").indexOf($) == -1: ("aeiou").indexOf($) != -1;
        // or simplified:
        return Objects.equals(scanType, "C") == (("aeiou").indexOf($) == -1);
    }

    public HashMap<String, Integer> countLetters(String providedString, String scanType) {
        String input = providedString.toLowerCase();
        HashMap<String, Integer> lettersMap = new HashMap<>();
        char[] chars = input.toCharArray();
        for (char aChar : chars) {
            if (genScanCondition(aChar, scanType)) {
                String consonantChar = String.valueOf(aChar); // convert char letter which passes test, to string
                if (lettersMap.containsKey(consonantChar)) { // check if key is present
                    Integer num = lettersMap.get(consonantChar);
                    num++; // if a value to the appropriate consonant exist then increment by 1
                    lettersMap.put(consonantChar, num);
                } else {
                    lettersMap.put(consonantChar, 1); // if a value to the appropriate consonant does not exist then
                                                      // start by 1
                }
            }
        }
        return lettersMap;
    }

    // public HashMap<String, Integer> countConsonants(String providedString) {
    // String input = providedString.toLowerCase();
    // HashMap<String, Integer> consonantsMap = new HashMap<>();
    // char[] chars = input.toCharArray();
    // for (char aChar : chars) {
    // if ((("aeiou").indexOf(aChar)) == -1) {
    // String consonantChar = String.valueOf(aChar); // convert char letter which
    // passes test, to string
    // if (consonantsMap.containsKey(consonantChar)) { // check if key is present
    // Integer num = consonantsMap.get(consonantChar);
    // num++; // if a value to the appropriate consonant exist then increment by 1
    // consonantsMap.put(consonantChar, num);
    // } else {
    // consonantsMap.put(consonantChar, 1); //if a value to the appropriate
    // consonant does not exist then start by 1
    // }
    // }
    // }
    // return consonantsMap;
    // }

    // public HashMap<String, Integer> countVowels(String providedString) {
    // String input = providedString.toLowerCase();
    // HashMap<String, Integer> vowelsMap = new HashMap<>();
    //
    // char[] chars = input.toCharArray();
    // for (char aChar : chars) {
    // if ((("aeiou").indexOf(aChar)) != -1) { //basically the same like above just
    // reversing the condition
    // String vowelChar = String.valueOf(aChar);
    // if (vowelsMap.containsKey(vowelChar)) {
    // Integer num = vowelsMap.get(vowelChar);
    // num++;
    // vowelsMap.put(vowelChar, num);
    // } else {
    // vowelsMap.put(vowelChar, 1);
    // }
    // }
    // }
    // return vowelsMap;
    // }

}
