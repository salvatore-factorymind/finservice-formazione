import { inject, Injectable, Signal, signal } from '@angular/core';
 
import { User } from '../models/user-model';
import { UserClientService } from './client/user-client.service';
import { finalize } from 'rxjs';
import { UnionService } from './union.service';
 
@Injectable()

export class UserService {
private readonly userClientSVC = inject(UserClientService);
private readonly unionsSvc = inject(UnionService);
private readonly isLoading = signal(false);
private readonly UserList = signal<User[]>([
    {
    id: 1,
    surname: "Rossi",
    name: "Mario",
    role: "Developer",
    dateBirth: new Date("1990-05-12")
  },
  {
    id: 2,
    surname: "Bianchi",
    name: "Laura",
    role: "Project Manager",
    dateBirth: new Date("1985-09-23")
  },
  {
    id: 3,
    surname: "Verdi",
    name: "Luca",
    role: "UI/UX Designer",
    dateBirth: new Date("1995-02-18")
  }
])
 
 
  public get User():Signal<User[]>{
    return this.UserList.asReadonly();
  }


  public SaveUser(FormUser: User):void{
    const existingUser = [...this.UserList()];

    const existingUserIndex = existingUser.findIndex(User => User.id === FormUser.id)

    if(existingUserIndex >= 0){
      const existingContact = existingUser[existingUserIndex]
      const updateContact = Object.assign({},existingContact, FormUser)
      
      existingUser.splice(existingUserIndex, 1, updateContact)
    }else{
      // Create modificato (Matteo)
      let maxId = 0;
      if (existingUser.length > 0) {
        maxId = Math.max(...existingUser.map(union => union.id));
      }
      const newUnion = { ...FormUser, id: maxId + 1 };
      existingUser.push(newUnion);
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
        user.splice(indexToRemove, 1);
        return [...user];
      })
    }
 
}