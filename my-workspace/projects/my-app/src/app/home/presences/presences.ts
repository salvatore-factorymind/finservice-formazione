import { Component, inject, signal } from '@angular/core';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxLookupModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UnionService } from '../../shared/service/union.service';
import { ProjectService } from '../../shared/service/project.service';
import { UserService } from '../../shared/service/user.service';
import { Union } from '../../shared/models/union-model';
import { User } from '../../shared/models/user-model';
import { Project } from '../../shared/models/project-model';
import { UnionModal } from '../../shared/modals/union-modal/union-modal';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-presences',
  templateUrl: './presences.html',
  styleUrl: './presences.css',
  imports: [DxDataGridModule, DxLookupModule, DxButtonModule, TranslatePipe]
})
export class Presences {
  protected readonly unionsSvc = inject(UnionService);
  protected readonly usersSvc = inject(UserService);
  protected readonly projectsSvc = inject(ProjectService);
  private modalSvc = inject(NgbModal);

  protected getUserFullName = (user: User) => `${user.surname} ${user.name}`;
  protected getDuration = (project: Project) => {
    const start = new Date(project.dateStart);
    const end = new Date(project.dateFinish);

    const formatDate = (d: Date) =>
      `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;

    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  protected readonly selectedUnion = signal<Union | undefined>(undefined);

  // Modifica
  protected handleRowClicked(event: DxDataGridTypes.RowClickEvent): void {
    const selectedProject = event.data as Union;
    const modalRef = this.modalSvc.open(UnionModal);
    (modalRef.componentInstance as UnionModal).unionIdToEdit = selectedProject.id;
  }

  // Nuovo
  protected handleNewUnion(): void {
    const modalRef = this.modalSvc.open(UnionModal);
    (modalRef.componentInstance as UnionModal).unionIdToEdit = 0;
  }



  // Elimina riga tabella
  protected onDeleteClick = (e: any) => {
    e.event.stopPropagation();

    const id = e.row.data.id;
    this.unionsSvc.deleteUnion(id);
  };
}
