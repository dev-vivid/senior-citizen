import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  beatList = [];
  constructor(private http: HttpClient, private messageService: MessageService) { }
  // Clone/assign object without reference
  CloneObject(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  // Clone/assign array without reference
  CloneArray(arr: any): any {
    return Object.assign([], arr);
  }
  base64ToArrayBuffer(base64: any) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
  saveByteArray(filename: string, byte: any) {
    const blob = new Blob([byte], { type: 'application/octet-stream' });
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
    //   window.navigator.msSaveOrOpenBlob(blob, filename);
    // } else { // for Non-IE (chrome, firefox etc.)
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display:none;');
    const csvUrl = URL.createObjectURL(blob);
    a.href = csvUrl;
    a.download = filename;
    a.click();
    a.remove();
    // }
  }
  downloadDocument(id: any, doc: any, filename: string) {
    const sampleArr = this.base64ToArrayBuffer(doc);
    this.saveByteArray(filename, sampleArr);
  }
  convertBase64ToFileObj(str: string) {
    const pos = str.indexOf(';base64,');
    const fileType = str.substring(5, pos);
    const b64 = str.substr(pos + 8);
    // decode base64
    const imageContent = atob(b64);
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);
    // fill the view, using the decoded base64
    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    // convert ArrayBuffer to Blob
    const blob = new Blob([buffer], { type: fileType });
    return blob;
  }
  convertFileURLToBlob(url:string){
    var blob = new Blob([url]);

    let reader = new FileReader;
   
    reader.readAsDataURL(blob); // read file as data url
    reader.onload = () => { // when file has loaded
       //console.log(reader.result)
       var img:any = new Image();
       img.src = reader.result;
   
       img.onload = () => {
   
        //  this.uploaded_image_width = img.width; //to get image width
        //  this.uploaded_image_height = img.height;  //to get image height           
   
        //console.log(reader.result)   
        return reader.result; //to get blob image       
       };          
     } 
  }
  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
  getDynamicFormData(): Observable<any> {
    return this.http.get('/assets/form.json');
  }
  cloneObject(obj: any) {
    return Object.assign({}, obj);
  }
  cloneArray(arr: any[]) {
    return JSON.parse(JSON.stringify(arr));
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

  // Toaster Messags Start

  showSuccess(message: string) {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: message });
  }

  showInfo(message: string) {
    this.messageService.add({ key: 'bc', severity: 'info', summary: 'Info', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Warn', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: message });
  }
  
  showDownload(message: string) {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Report Processing!', detail: message });
  }

  showDownloadError(message: string) {
    this.messageService.add({ key: 'bc', severity: 'error', summary: 'Please Select Anytype', detail: message });
  }
  // Toaster Messags End

}
