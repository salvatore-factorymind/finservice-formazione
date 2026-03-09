import { Injectable} from '@angular/core';
 
@Injectable()
 
export class FunctionsService {
 
public delete(IdToDelete: number, lista: any[]): any[] {
    const indexToRemove = lista.findIndex(item => item.id === IdToDelete);
 
    if (indexToRemove !== -1) {
      lista.splice(indexToRemove, 1);
    }
 
    return lista;
  }
 
}
 