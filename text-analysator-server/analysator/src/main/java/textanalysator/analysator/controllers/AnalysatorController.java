package textanalysator.analysator.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import textanalysator.analysator.service.AnalysatorService;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200") //cors blocks requests blocked by default, enable our angular client
@RequestMapping("/api/text-analysator")
public class AnalysatorController {
    @Autowired
    private AnalysatorService analysatorService;

    @PostMapping
    @ResponseBody
    private HashMap<String, Integer> getInputAndDecodeType(@RequestBody IRequestBody body) {
        //System.out.println("body: " + body);
        String input = body.getInputProvided();
        String scanType = String.valueOf(body.getScanType());

        HashMap<String, Integer> result;
        if(Objects.equals(scanType, "C")){
            result = analysatorService.countConsonants(input);
            System.out.println("result: " + result);
           return result;
        }
        else if (Objects.equals(scanType, "V")){
            result = analysatorService.countVowels(input);
            return result;
        }
        else {
            result = analysatorService.countAll(input);
            return result;
        }
    }

    }