import { Component, inject, signal } from '@angular/core';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { UnionService } from '../../shared/service/union.service';
import { DxLookupModule } from 'devextreme-angular';
import { ProjectService } from '../../shared/service/project.service';
import { UserService } from '../../shared/service/user.service';
import { Union, User, Project } from '../../shared/models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnionModal } from '../../shared/modale/union-modal/union-modal';

@Component({
  selector: 'app-presences',
  templateUrl: './presences.html',
  styleUrl: './presences.css',
  imports: [DxDataGridModule, DxLookupModule]
})
export class Presences {
  protected readonly unionsSvc = inject(UnionService);
  protected readonly usersSvc = inject(UserService);
  protected readonly projectsSvc = inject(ProjectService);

  protected getUserFullName = (user: User) => `${user.surname} ${user.name}`;
  protected getDuration = (project: Project) => {
    const start = new Date(project.dateStart);
    const end = new Date(project.dateFinish);

    const formatDate = (d: Date) =>
      `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;

    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  protected readonly selectedUnion = signal<Union | undefined>(undefined);

  private modalSvc = inject(NgbModal);

  // Modifica
  protected handleRowClicked(event: DxDataGridTypes.RowClickEvent): void{
    const selectedProject = event.data as Union;
    const modalRef = this.modalSvc.open(UnionModal);
    (modalRef.componentInstance as UnionModal).unionIdToEdit = selectedProject.id;
  }

  // Nuovo
  protected handleNewUnion (): void{
    const modalRef = this.modalSvc.open(UnionModal);
    (modalRef.componentInstance as UnionModal).unionIdToEdit = 0;
  }


}
