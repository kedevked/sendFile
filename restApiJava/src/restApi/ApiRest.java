package restApi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.*;

@Controller
@RequestMapping("/")
public class ApiRest {

    @RequestMapping(value="test", method = RequestMethod.GET)
    @ResponseBody
    public String helloSendFile(){

        System.out.println("backend");
        return "Hello send File";
    }

    @RequestMapping(value = "upload", method = RequestMethod.POST)
    public HashMap<String, String> uploaderDeploiement(MultipartHttpServletRequest request){

        MultipartFile fichierZip = request.getFile("file");

        String fileName = fichierZip.getOriginalFilename();

        HashMap< String, String > messageResponse = new HashMap< String, String>();
        messageResponse.put("fileName", fileName);
        return messageResponse;
    }
}
