import { Injectable, Signal, signal } from '@angular/core';

import { Union } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UnionService {

private readonly UnionList = signal<Union[]>([
  {
    id: 1,
    idUser: 1,    
    idProject: 1,       
    hours: 120
  },
  {
    id: 2,
    idUser: 2,            
    idProject: 1,       
    hours: 80
  },
  {
    id: 3,
    idUser: 3,
    idProject: 2,
    hours: 60
  }
])

  public get Union():Signal<Union[]>{
    return this.UnionList.asReadonly();
  }




}
