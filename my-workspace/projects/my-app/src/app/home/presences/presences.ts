import { Component, inject, signal } from '@angular/core';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { UnionService } from '../../shared/service/union.service';
import { DxLookupModule } from 'devextreme-angular';
import { ProjectService } from '../../shared/service/project.service';
import { UserService } from '../../shared/service/user.service';

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

  protected readonly selectedUnion = signal<UnionService | undefined>(undefined);


  protected handleRowClicked(event: DxDataGridTypes.RowClickEvent): void{
     const selectedUnion = event.data as UnionService;
     this.selectedUnion.set(selectedUnion);
  }
}
