import { Injectable} from '@angular/core';
@Injectable()
 
export class FunctionsService {
  
  public delete(IdToDelete: number, lista: any[]): any[] {
    lista.splice(IdToDelete, 1);
    return [...lista]
  }

  public add(existingItem: any[], existingIndex:number, Form: any) {
    const existing = existingItem[existingIndex]
    const updateContact = Object.assign({},existing, Form)  
    existingItem.splice(existingIndex, 1, updateContact)
  }

  public edit(existingItem: any[], Form: any){
    let maxId = 0;
      if (existingItem.length > 0) {
        maxId = Math.max(...existingItem.map(union => union.id));
      }
      const newUnion = { ...Form, id: maxId + 1 };
      existingItem.push(newUnion);
  }

}



