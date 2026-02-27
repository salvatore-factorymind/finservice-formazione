import { Injectable, signal } from '@angular/core';

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





}
