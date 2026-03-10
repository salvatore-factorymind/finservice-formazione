import { Injectable} from '@angular/core';
@Injectable()
 
export class FunctionsService {
  
  public delete(IdToDelete: number, lista: any[]): any[] {
    lista.splice(IdToDelete, 1);
    return [...lista]
  }

  public add(IdtoAdd: number, lista:any[]){
    
  }

}



