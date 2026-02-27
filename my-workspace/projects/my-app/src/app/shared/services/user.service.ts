import { Injectable, signal } from '@angular/core';

import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private readonly UserList = signal<User[]>([])





}
