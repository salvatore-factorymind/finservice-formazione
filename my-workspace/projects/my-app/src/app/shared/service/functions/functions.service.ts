import { Injectable, input } from '@angular/core';

@Injectable()

export class FunctionsService {

  /*public readonly Lista = input.required<string>();
  public readonly id = input.required<number>();
  public readonly array = input.required<string>();
*/
  public delete(IdToDelete: number, lista: any[]): void{
    const indexToRemove = lista.findIndex(array => array.id === IdToDelete);
    /*
    lista.update(array => {
      array.splice(indexToRemove, 1);
      return [...array];
    })*/
  }
}