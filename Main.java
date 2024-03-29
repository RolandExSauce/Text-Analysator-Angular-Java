import java.util.*;

public class Main {
  public static void main(String[] args) {
    if (args[0].equals("vowels")) {
      countVowels(args[1]);
    } else if (args[0].equals("consonants")) {
      countConsonants(args[1]);
    }
  }

  // method to count consonants
  public static void countConsonants(String providedString) {
    String input = providedString.toLowerCase();
    HashMap<String, Integer> consonants = new HashMap<>();

    char[] chars = input.toCharArray();
    for (int i = 0; i < chars.length; i++) {
      // we exclude everything with a matching index cuz that would be one of the
      // vowels, googled for check if character is in an array
      // if ((new String(new char[] { 'a', 'e', 'i', 'o', 'u' }).indexOf(chars[i])) == -1) {
      if ((("aeiou").indexOf(chars[i])) == -1) {
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

  // method to count vowels
  public static void countVowels(String providedString) {
    int numA = 0, numE = 0, numI = 0, numO = 0, numU = 0; // declare variable of same type all together
    char[] chars = providedString.toLowerCase().toCharArray();

    for (int i = 0; i < chars.length; i++) {
      switch (chars[i]) {
        case 'a' -> numA++;
        case 'e' -> numE++;
        case 'i' -> numI++;
        case 'o' -> numO++;
        case 'u' -> numU++;
      } // switch statement is much shorter
    }
    // print result
    System.out.println("Letter 'A/a' appears " + numA + " times");
    System.out.println("Letter 'E/e' appears " + numE + " times");
    System.out.println("Letter 'I/i' appears " + numI + " times");
    System.out.println("Letter 'O/o' appears " + numO + " times");
    System.out.println("Letter 'U/u' appears " + numU + " times");
  }
}