import { inject, Injectable, Signal, signal } from '@angular/core';
import { Project } from '../models/project-model';
import { UnionService } from './union.service';

 
 
 
@Injectable()
export class ProjectService {
private readonly unionsSvc = inject(UnionService);
 
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
 
  public getProject(projectId: number): Project | undefined{
    return this.ProjectList().find(project => project.id === projectId);
  }
 
 public saveProject(formProject: Project): void{
    const existingProjects = this.ProjectList();
 
    const existingProjectIndex = existingProjects.findIndex(project => project.id === formProject.id);
 
    if(existingProjectIndex >= 0){
      const existingProject = existingProjects[existingProjectIndex];
 
      const updatedProject = Object.assign({}, existingProject, formProject);
 
      existingProjects.splice(existingProjectIndex, 1, updatedProject);
    }else{
      const maxId=Math.max(...existingProjects.map(project => project.id));
      formProject.id=maxId + 1;
      existingProjects.push(formProject);
    }
 
    this.ProjectList.set([...existingProjects]);
 }

 public deleteProject(projectIdToDelete: number): void {
    const indexToRemove = this.ProjectList().findIndex(project => project.id === projectIdToDelete);

    // Funzione cancella user in union
    console.log("INDICE PROGETTO DA CANCELLARE: ", projectIdToDelete)
    this.unionsSvc.deleteUnionProject(projectIdToDelete);

    this.ProjectList.update(project => {
      project.splice(indexToRemove, 1);
      return [...project];
    })
  }
}