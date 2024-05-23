package textanalysator.analysator.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import textanalysator.analysator.service.AnalysatorService;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // cors blocks requests blocked by default, enable our angular client
@RequestMapping("/api/text-analysator")
public class AnalysatorController {
    @Autowired
    private AnalysatorService analysatorService;

    @PostMapping
    @ResponseBody
    private List<Map<String, Object>> getInputAndDecodeType(@RequestBody IRequestBody body) {
        String input = body.getInputProvided();
        String scanType = String.valueOf(body.getScanType());
        List<Map<String, Object>> resultList = new ArrayList<>(); // response will be set as an array because
        // in frontend, we are matching the UI to set v or c or both simultaneously

        // according to scanType we specify a key of CType, VType for the client to know
        // which array has which data
        if (Objects.equals(scanType, "C")) {
            Map<String, Object> result = new HashMap<>();
            // result.put("CType", analysatorService.countConsonants(input));
            result.put("CType", analysatorService.countLetters(input, scanType));
            resultList.add(result);
        } else if (Objects.equals(scanType, "V")) {
            Map<String, Object> result = new HashMap<>();
            // result.put("VType", analysatorService.countVowels(input));
            result.put("VType", analysatorService.countLetters(input, scanType));
            resultList.add(result);
        } else {
            Map<String, Object> vowelResult = new HashMap<>();
            // vowelResult.put("VType", analysatorService.countVowels(input));
            vowelResult.put("VType", analysatorService.countLetters(input, "V"));
            resultList.add(vowelResult);

            Map<String, Object> consonantResult = new HashMap<>();
            // consonantResult.put("CType", analysatorService.countConsonants(input));
            consonantResult.put("CType", analysatorService.countLetters(input, "C"));
            resultList.add(consonantResult);
        }
        return resultList;
    }

}