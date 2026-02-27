import { Injectable, signal } from '@angular/core';

import { User } from '../models/models';
import { Projects } from '../../home/projects/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

private readonly ProjectList = signal<Projects[]>([
   
])





}
