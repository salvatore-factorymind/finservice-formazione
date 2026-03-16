import { computed, Injectable, Signal, signal } from '@angular/core';
import { Union } from '../models/union-model';
 
@Injectable()

export class UnionService {
  private readonly unionList = signal<Union[]>([
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
    return this.unionList.asReadonly();
  }
  
  
  public getUnion(projectId: number): Union | undefined {
    return this.unionList().find(union => union.id === projectId);
  }


  public saveUnion(formUnion: Union): void{
    const existingUnions = this.unionList();

    const existingUnionsIndex = existingUnions.findIndex(union => union.id === formUnion.id);
    //Update
    if(existingUnionsIndex >= 0){
      const existingUnion = existingUnions[existingUnionsIndex];
      const updatedProject = Object.assign({}, existingUnion, formUnion);
      existingUnions.splice(existingUnionsIndex, 1, updatedProject);
    } else {
      // Create
      let maxId = 0;
      if (existingUnions.length > 0) {
        maxId = Math.max(...existingUnions.map(union => union.id));
      }
      const newUnion = { ...formUnion, id: maxId + 1 };
      existingUnions.push(newUnion);
    }

    this.unionList.set([...existingUnions]);
  }

  // Elimina Unione
  public deleteUnion(unionIdToDelete: number): void {
    const indexToRemove = this.unionList().findIndex(union => union.id === unionIdToDelete);

    this.unionList.update(union => {
      union.splice(indexToRemove, 1);
      return [...union];
    })
  }
  // Elimina User
  public deleteUnionUser(userIdToDelete: number): void{
    this.unionList.update(unions => {
      for(let i = unions.length - 1; i >= 0; i--){
        console.log("Controlla: ", unions[i].idUser)
        if(unions[i].idUser === userIdToDelete){
          console.log("cancella!");
          unions.splice(i,1);
        }
      }
      console.log("FINE");
      return [...unions];
    });
  }
  //Elimina Progetto
  public deleteUnionProject(projectIdToDelete: number): void{
    this.unionList.update(unions => {
      for(let i = unions.length - 1; i >= 0; i--){
        console.log("Controlla: ", unions[i].idProject)
        if(unions[i].idProject === projectIdToDelete){
          console.log("cancella!");
          unions.splice(i,1);
        }
      }
      console.log("FINE");
      return [...unions];
    });
  }

  public readonly totalHour = computed(() => {
    const sum = this.unionList().reduce((tot, arr) => tot + arr.hours, 0);

    return sum;
  })

  public readonly getHour = computed(() => {
    const unions = this.unionList();

    const hoursByUser: { idUser: number, hours: number }[] = [];

    unions.forEach(u => {
      const existing = hoursByUser.find(h => h.idUser === u.idUser);

      if (existing) {
        existing.hours += u.hours;
      } else {
        hoursByUser.push({
          idUser: u.idUser,
          hours: u.hours
        });
      }
    });

    return hoursByUser;
  })
}