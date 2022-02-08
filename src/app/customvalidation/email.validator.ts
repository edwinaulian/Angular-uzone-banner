import { FormControl } from '@angular/forms';
function emailDomainValidator(control: FormControl) { 
    let email = control.value; 
    if (email && email.indexOf("@") != -1) { 
      let [_, domain] = email.split("@"); 
      if (domain !== "gmail.com") { 
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null; 
  }