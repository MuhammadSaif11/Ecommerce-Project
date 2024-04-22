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

  byteToFile2(productImage:any){
    if(productImage){
      const byteString = window.atob(productImage.picByte);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8array = new Uint8Array(arrayBuffer);
      for(let i=0; i < byteString.length; i++){
        int8array[i] = byteString.charCodeAt(i);
      }
      const imageBlob = new Blob([int8array], {type:productImage.type});
      const imageFile = new File([imageBlob],productImage.name,{type:productImage.type});
      return imageFile;
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

  getSingleUrlOfImageFile(file:File):SafeUrl{
    if(file){
    const safeUrl:SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      return safeUrl;
    }
    return null;
  }

  // resizeImages(files: File[]): Promise<string[]> {
  //   const urls: string[] = [];
  
  //   const resizePromises = files.map(file => new Promise<void>((resolve, reject) => {
  //     const reader = new FileReader();
  
  //     reader.onload = (event: any) => {
  //       const img = new Image();
  //       img.src = event.target.result;
        
  //       const canvas = document.createElement('canvas');
  //       const ctx = canvas.getContext('2d');
        
  //       img.onload = () => {
  //         const MAX_WIDTH = 250;
  //         const MAX_HEIGHT = 200;
  //         let width = img.width;
  //         let height = img.height;
  
  //         if (width > height) {
  //           if (width > MAX_WIDTH) {
  //             height *= MAX_WIDTH / width;
  //             width = MAX_WIDTH;
  //           }
  //         } else {
  //           if (height > MAX_HEIGHT) {
  //             width *= MAX_HEIGHT / height;
  //             height = MAX_HEIGHT;
  //           }
  //         }
  
  //         canvas.width = width;
  //         canvas.height = height;
  //         ctx.drawImage(img, 0, 0, width, height);
  
  //         const dataURL = canvas.toDataURL('image/jpeg');
  //         urls.push(dataURL);
  //         resolve();
  //       };
  
  //       img.onerror = reject;
  //       img.src = event.target.result;
  //     };
  
  //     reader.readAsDataURL(file);
  //   }));
  
  //   return Promise.all(resizePromises).then(() => urls);
  // }
  
  
}
