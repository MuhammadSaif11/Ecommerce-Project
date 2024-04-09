import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  sanitizer:DomSanitizer = inject(DomSanitizer);
  constructor() { }

  byteToFile(productImages:any){
    const imageFiles:File[] = [];
    if(productImages){
      productImages.forEach((img:any)=>{
        const byteString = window.atob(img.picByte);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8array = new Uint8Array(arrayBuffer);
        for(let i=0; i < byteString.length; i++){
          int8array[i] = byteString.charCodeAt(i);
        }
        const imageBlob = new Blob([int8array], {type:img.type});
        const imageFile = new File([imageBlob],img.name,{type:img.type});
        imageFiles.push(imageFile);
      })
      return imageFiles;
    }
    return null;
  }

  getUrlOfImageFile(files:File[]){
    const urls:SafeUrl[] = [];
    if(files){
      files.forEach((file:File) => urls.push(this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))))
      return urls;
    }
    return null;
  }
}
