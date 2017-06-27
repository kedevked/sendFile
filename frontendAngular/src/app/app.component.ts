import { Component } from '@angular/core';
import {AppService} from "./app-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    private appService: AppService
  ){}
  private errorFileExtension: boolean;

  changeListener($event): void {
    console.log("change listener");
    this.errorFileExtension=false; // to remove the warning each time a change is detected
    this.readThis($event.target);
    /*this.appService.getDemarches()
     .then((heroes => {this.deploiements = heroes;
     console.log("heroes:"+ this.deploiements);
     }))*/
  }

  readThis(inputValue: any): void {

    var file: File = inputValue.files[0];

    var fileName: string = file.name;
    var fileExtension: string = fileName.substr((fileName.lastIndexOf('.')+1)); //read the extension of the file

   /* if(fileExtension!='zip'){
      this.errorFileExtension=true;
    }
    else{
      /!*var myReader: FileReader = new FileReader();
       var fileType = inputValue.parentElement.id;
       myReader.onloadend = function (e) {
       console.log("test:"+myReader.result); //myReader.result is a String of the uploaded file
       };
       myReader.readAsText(file); // triggers .onloadend when the reading of the file is completed*!/
      this.appService.deployement(file);
    }*/
   console.log("test");
    this.appService.deployement(file);
  }

  downloadfile(filePath: string){
    this.appService.downloadfile(filePath)
      .subscribe(data => this.getZipFile(data)),
      error => console.log("Error downloading the file."),
      () => console.log('Completed file download.');
  }


  getZipFile(data: any){
    /*var a: any = document.createElement("a");
    document.body.appendChild(a);

    a.style = "display: none";
    //var blob = new Blob([data], { type: 'application/zip' });

    var url= window.URL.createObjectURL(data);

    a.href = url;
    a.download = "test.zip";
    a.click();
    window.URL.revokeObjectURL(url);*/

    var blob = new Blob([data], { type: 'application/zip' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);

  }
}
