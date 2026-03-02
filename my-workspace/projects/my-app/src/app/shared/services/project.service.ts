import { Injectable, Signal, signal } from '@angular/core';
 
import { Projects } from '../../home/projects/projects';
 
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
private readonly ProjectList = signal<Projects[]>([
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
 
  public get CarBrand():Signal<Projects[]>{
    return this.ProjectList.asReadonly();
  }
 
 
}