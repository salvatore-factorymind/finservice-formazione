import { computed, inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/user-model';



@Injectable({
  providedIn: 'root'
})
export class UserClientService {
  private readonly http = inject(HttpClient)
  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>('./assets/users.json')
    .pipe(delay(2000))
  }

  public getUser(UserId: number): Observable<User | undefined>{
    return this.getUsers()
    .pipe(
      map(User => User.find(User => User.id === UserId))
    )
  }


  
}

