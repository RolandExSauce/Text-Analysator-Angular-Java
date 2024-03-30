package textanalysator.analysator.service;
import org.springframework.stereotype.Service;
import lombok.Data;
import java.util.*;

@Service
@Data
public class AnalysatorService {
    public  HashMap<String, Integer> countConsonants(String providedString) {
        String input = providedString.toLowerCase();
        HashMap<String, Integer> consonantsMap = new HashMap<>();
        consonantsMap.put("CType",0);
        char[] chars = input.toCharArray();
        for (char aChar : chars) {
            if ((("aeiou").indexOf(aChar)) == -1) {
                String consonantChar = String.valueOf(aChar); // convert char letter which passes test, to string
                if (consonantsMap.containsKey(consonantChar)) { // check if key is present
                    Integer num = consonantsMap.get(consonantChar);
                    num++; // if a value to the appropriate consonant exist then increment by 1
                    consonantsMap.put(consonantChar, num);
                } else {
                    consonantsMap.put(consonantChar, 1); //if a value to the appropriate consonant does not exist then start by 1
                }
            }
        }
        return consonantsMap;
    }

    public  HashMap<String, Integer> countVowels(String providedString) {
        String input = providedString.toLowerCase();
        HashMap<String, Integer> vowelsMap = new HashMap<>();
        vowelsMap.put("VType", 0); //just so that the client know which structure to mod

        char[] chars = input.toCharArray();
        for (char aChar : chars) {
            if ((("aeiou").indexOf(aChar)) != -1) {
                String vowelChar = String.valueOf(aChar); // convert char letter which passes test, to string
                if (vowelsMap.containsKey(vowelChar)) { // check if key is present
                    Integer num = vowelsMap.get(vowelChar);
                    num++; // if a value to the appropriate consonant exist then increment by 1
                    vowelsMap.put(vowelChar, num);
                } else {
                    vowelsMap.put(vowelChar, 1); //if a value to the appropriate consonant does not exist then start by 1
                }
            }
        }
        return vowelsMap;
    }

    public  HashMap<String, Integer> countAll(String providedString) {
        String input = providedString.toLowerCase();
        HashMap<String, Integer> letterMap = new HashMap<>();
        letterMap.put("CVType",0); //to indicate both were scanned

        char[] chars = input.toCharArray();
        for (char aChar : chars) {
                String charLetter = String.valueOf(aChar); // convert char letter which passes test, to string
                if (letterMap.containsKey(charLetter)) { // check if key is present
                    Integer num = letterMap.get(charLetter);
                    num++; // if a value to the appropriate consonant exist then increment by 1
                    letterMap.put(charLetter, num);
                } else {
                    letterMap.put(charLetter, 1); //if a value to the appropriate consonant does not exist then start by 1
                }
        }
        return letterMap;
    }
}
