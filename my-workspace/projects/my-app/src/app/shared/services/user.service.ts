import { Injectable, Signal, signal } from '@angular/core';
 
import { User } from '../models/models';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
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
      const MaxId = Math.max(...existingUser.map(User => User.id))+1
      FormUser.id = MaxId
      existingUser.push(FormUser);
    }
    this.UserList.set(existingUser)

  }
 
}