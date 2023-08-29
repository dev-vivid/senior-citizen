import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private messageService: MessageService) { }

  public showMessage(message: string, type: string) {
     if(type=='success'){  
       this.messageService.add({severity:'success', summary:message});
     } else if(type==='Error'){
       this.messageService.add({severity:'error', summary:message});
     }
   } 
 
}
