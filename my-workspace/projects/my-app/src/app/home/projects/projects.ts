import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../shared/service/project.service';
import { ProjectModalComponent } from '../../shared/modals/projects-modals/project-modal';
import { Project } from '../../shared/models/project-model';
import { FunctionsService } from '../../shared/service/functions/functions.service';
import { LowerCasePipe } from '@angular/common';
import { DxPieChartModule } from 'devextreme-angular';
 
@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  imports: [DxDataGridModule, TranslatePipe, LowerCasePipe, DxPieChartModule]
})
export class Projects {
  protected readonly projectSvc = inject(ProjectService);
  protected readonly functionsSvc = inject(FunctionsService);
  
  private readonly modalSvc = inject(NgbModal);
  
  ProjectTypes = [
    { id: 0, text: 'WEB APP' },
    { id: 1, text: 'MOBILE APP' },
    { id: 2, text: 'ECOMMERCE' }
  ];

  protected handleNewProject(): void{
    const modalRef = this.modalSvc.open(ProjectModalComponent);
 
    (modalRef.componentInstance as ProjectModalComponent).projectIdToEdit = 0;
  }
 
  protected handleRowClicked(event: DxDataGridTypes.RowClickEvent): void{
    const selectedProject = event.data as Project;
 
    const modalRef = this.modalSvc.open(ProjectModalComponent);
 
    (modalRef.componentInstance as ProjectModalComponent).projectIdToEdit = selectedProject.id;
  }

  handleDeleteClick = (e: any): void => {
    e.event.stopPropagation();

    const id = e.row.data.id;

    this.projectSvc.deleteProject(id);

    //this.functionsSvc.delete(id, this.projectSvc.Project());
  }

  protected readonly ProjectTypeData = computed(() => {
    const users = this.projectSvc.Project();
    const counts: Record<number, number> = {
      0: 0,
      1: 0,
      2: 0
    };

    users.forEach(u => {
      counts[u.type]++;
    });

    return this.ProjectTypes.map(c => ({
      type: c.text,
      value: counts[c.id]
    }));

});


}