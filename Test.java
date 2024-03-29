import java.util.*;

/**
 * The program for calculating how many times letter in given sentence appears.
 * It gives numbers either for vowels or for consonants based on program input.
 * <p>
 * The first parameter can be 'vowels' or 'consonants'
 * The second parameter is the sentence to be analyzed.
 * <p>
 * Task: Refactor this code to be production ready and create appropriate unit
 * tests.
 */

// just rename to main for now

public class Test {
  public static void main(String[] args) {
    int numA = 0, numE = 0, numI = 0, numO = 0, numU = 0;
    if (args[0].equals("vowels")) {
      String input = args[1].toLowerCase();// every letter to lowerCase first
      char[] chars = input.toCharArray();

      for (int i = 0; i < chars.length; i++) {
        switch (chars[i]) {
          case 'a' -> numA++;
          case 'e' -> numE++;
          case 'i' -> numI++;
          case 'o' -> numO++;
          case 'u' -> numU++;
        } // switch statement is much shorter
      }

      System.out.println("Letter 'A/a' appears " + numA + " times");
      System.out.println("Letter 'E/e' appears " + numE + " times");
      System.out.println("Letter 'I/i' appears " + numI + " times");
      System.out.println("Letter 'O/o' appears " + numO + " times");
      System.out.println("Letter 'U/u' appears " + numU + " times");

    } else if (args[0].equals("consonants")) {
      String input = args[1].toLowerCase();
      HashMap<String, Integer> consonants = new HashMap<>();

      char[] chars = input.toCharArray();
      for (int i = 0; i < chars.length; i++) {

        // just for debbugging purposes I wrote this in 3 lines, we could directly pass
        // everything in the if condition
        // char[] charVowelArr = { 'a', 'e', 'i', 'o', 'u' }; //array of chars with our
        // vowel
        // String charVowelArrToString = new String(charVowelArr); //convert char arr to
        // string
        // Integer checkLetterExists = charVowelArrToString.indexOf(chars[i]); //check
        // if any of the individual characters are present in our array, if not then
        // this will return -1, if

        // we exclude everything with a matching index cuz that would be one of the
        // vowels
        if ((new String(new char[] { 'a', 'e', 'i', 'o', 'u' }).indexOf(chars[i])) == -1) {
          // if (checkLetterExists == -1) {
          String consonantChar = String.valueOf(chars[i]); // convert char letter which passes test, to string
          if (consonants.containsKey(consonantChar)) { // check if key is present
            Integer num = consonants.get(consonantChar);
            num++; // if a value to the appropriate consonant exist then increment by 1
            consonants.put(consonantChar, num);
          } else {
            consonants.put(consonantChar, 1); // if a value to the appropriate consonant does not exist then start by 1
          }

        }
      }
      System.out.println("hashmap consonants: " + consonants);
      consonants.entrySet().forEach(entrySet -> {
        System.out.println("Letter '" + entrySet.getKey() + "' appears " + entrySet.getValue() + " times");
      });
    }
  }

  // //count vowels
  // public void countVowels(String providedString){

  // // convert to lowercase and to array of chars
  // char[] chars = providedString.toCharArray();

  // for (int i = 0; i < chars.length; i++) {
  // // System.out.println(chars[i]);

  // // transform everything to lowerCase
  // if (chars[i] == 'a')
  // numA++;
  // if (chars[i] == 'e')
  // numE++;
  // if (chars[i] == 'i')
  // numI++;
  // if (chars[i] == 'o')
  // numO++;
  // if (chars[i] == 'u')
  // numU++;
  // }
  // }

}
