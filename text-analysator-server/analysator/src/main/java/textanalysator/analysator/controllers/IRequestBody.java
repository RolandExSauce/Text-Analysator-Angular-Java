package textanalysator.analysator.controllers;
import lombok.*;

//define type for input passed by user
@Data
class IRequestBody  {
    private String inputProvided;
    private ScanType scanType;

    public enum ScanType { // restrict scan type
        C, V, CV
    }
}


