package restApi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;

/**
 * Created by user on 26/06/2017.
 */
@Controller
@RequestMapping("/")

@CrossOrigin
public class apiRest {

    File dowloadFile;
    @RequestMapping(value="test", method = RequestMethod.GET)
    @ResponseBody
    public String helloSendFile(){

        System.out.println("backend");
        return "Hello send File";
    }

    @RequestMapping(value = "upload", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, String> uploaderDeploiement(@RequestParam MultipartFile file) throws IOException {

        //MultipartFile fichierZip = request.getFile("file");

        //String fileName = fichierZip.getOriginalFilename();

        File newFile = new File(file.getOriginalFilename());

        file.transferTo(newFile);

        dowloadFile = newFile;

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(newFile)));

        String line;
        System.out.println("*****lecture du fichier*****");
        System.out.println("nom du fichier: " + newFile.getName());

        while ((line = bufferedReader.readLine()) != null){
            System.out.println(line);
        }

        HashMap< String, String > messageResponse = new HashMap< String, String>();
        messageResponse.put("fileName", file.getOriginalFilename());
        return messageResponse;
    }

    @RequestMapping(value = "download", method = RequestMethod.GET)
    public void download(HttpServletResponse response) throws IOException {
        System.out.println("nom du fichier:" + dowloadFile.getName());
        InputStream inputStream = new FileInputStream(dowloadFile);

        response.addHeader("Content-Disposition", "attachment; filename="+dowloadFile.getName());
        response.setHeader("Content-Type", "application/zip");

        org.apache.commons.io.IOUtils.copy(inputStream, response.getOutputStream());
        response.getOutputStream().flush();

    }
}
