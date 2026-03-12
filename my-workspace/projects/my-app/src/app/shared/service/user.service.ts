import { computed, inject, Injectable, Signal, signal } from '@angular/core';
 
import { ContractType, User } from '../models/user-model';
import { UnionService } from './union.service';
import { FunctionsService } from './functions/functions.service';
 
@Injectable()

export class UserService {
private readonly functionSvc = inject(FunctionsService)
private readonly unionsSvc = inject(UnionService);
private readonly isLoading = signal(false);
private readonly UserList = signal<User[]>([
    {
    id: 1,
    surname: "Rossi",
    name: "Mario",
    role: "Developer",
    dateBirth: new Date("1990-05-12"),
    contract: ContractType.FixedTerm
  },
  {
    id: 2,
    surname: "Bianchi",
    name: "Laura",
    role: "Project Manager",
    dateBirth: new Date("1985-09-23"),
    contract: ContractType.Intern
  },
  {
    id: 3,
    surname: "Verdi",
    name: "Luca",
    role: "UI/UX Designer",
    dateBirth: new Date("1995-02-18"),
    contract: ContractType.Permanent
  }
])
 
 
  public get User():Signal<User[]>{
    return this.UserList.asReadonly();
  }


  public SaveUser(FormUser: User):void{
    const existingUser = [...this.UserList()];

    const existingUserIndex = existingUser.findIndex(User => User.id === FormUser.id)

    if(existingUserIndex >= 0){
      /*
      const existingContact = existingUser[existingUserIndex]
      const updateContact = Object.assign({},existingContact, FormUser)
      
      existingUser.splice(existingUserIndex, 1, updateContact)
      */
     this.functionSvc.add(existingUser, existingUserIndex, FormUser)

    }else{
      /*
      let maxId = 0;
      if (existingUser.length > 0) {
        maxId = Math.max(...existingUser.map(union => union.id));
      }
      const newUnion = { ...FormUser, id: maxId + 1 };
      existingUser.push(newUnion);
      */

      this.functionSvc.edit(existingUser, FormUser)
    }
    
    this.UserList.set(existingUser)
  }

  public get loading():Signal<boolean>{
    return this.isLoading.asReadonly();
  }

   public init():void{
    /*this.isLoading.set(true);

    this.userClientSVC.getUsers()
    .pipe(
      finalize(()=> this.isLoading.set(false))
    )
    .subscribe({
      next: users => {
        this.UserList.set(users);
        
      },
      error: err=> {
      },
    });*/
  }

    public deleteUser(UserIdToDelete: number): void {
      const indexToRemove = this.UserList().findIndex(user => user.id === UserIdToDelete);

      // Funzione cancella user in union
      console.log("INDICE UTENTE DA CANCELLARE: ", UserIdToDelete)
      this.unionsSvc.deleteUnionUser(UserIdToDelete);

      this.UserList.update(user => {
        return this.functionSvc.delete(indexToRemove, user)

      })
    }

  public readonly UserCount = computed(() => {
    const UserCnt = this.UserList();
    return UserCnt.length;
  })
    
 
}