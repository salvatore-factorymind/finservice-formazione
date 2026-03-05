import { Injectable, Signal, signal } from '@angular/core';
import { Project } from '../models/project-model';
 
@Injectable()

export class ProjectService {
 
private readonly ProjectList = signal<Project[]>([
   {
    id: 1,
    name: "E-commerce Platform",
    description: "Sviluppo piattaforma e-commerce aziendale",
    dateStart: new Date("2024-01-10"),
    dateFinish: new Date("2024-06-30")
  },
  {
    id: 2,
    name: "Mobile App",
    description: "App mobile per clienti",
    dateStart: new Date("2024-03-01"),
    dateFinish: new Date("2024-09-15")
  }
])
 
  public get Project():Signal<Project[]>{
    return this.ProjectList.asReadonly();
  }
 
 
}