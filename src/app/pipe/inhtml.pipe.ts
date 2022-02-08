import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'inhtml'
})
export class InhtmlPipe implements PipeTransform {
  
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustScript(style);
    // return this.sanitizer.bypassSecurityTrustUrl(style);
    // return this.sanitizer.bypassSecurityTrustResourceUrl(style);  
  }

}