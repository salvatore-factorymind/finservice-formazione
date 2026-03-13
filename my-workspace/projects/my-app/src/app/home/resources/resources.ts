import { Component, computed, inject, OnInit } from '@angular/core';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingIndicator } from 'my-lib';
import { LowerCasePipe } from '@angular/common';
import { DxPieChartModule } from 'devextreme-angular';

import { User } from '../../shared/models/user-model';
import { UserModalComponent } from '../../shared/modals/user-modals/user-modal';
import { UserService } from '../../shared/service/user.service';
import { FunctionsService } from '../../shared/service/functions/functions.service';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.html',
  styleUrl: './resources.css',
  imports: [DxDataGridModule, TranslatePipe, LoadingIndicator, LowerCasePipe, DxPieChartModule]
})
export class Resources implements OnInit {
  protected readonly FunctionsSvc = inject(FunctionsService)
  protected readonly UserSvc = inject(UserService);
  private readonly modalSvc = inject(NgbModal);
  
  contractTypes = [
    { id: 0, text: 'Tempo determinato' },
    { id: 1, text: 'Tempo indeterminato' },
    { id: 2, text: 'Stagista' }
  ];
  
  public ngOnInit(): void {
    this.UserSvc.init();
  }
  
  protected handleNewUser(): void {
    const modalRef = this.modalSvc.open(UserModalComponent);
    (modalRef.componentInstance as UserModalComponent).UserIdToEdit = 0;

      modalRef.closed.subscribe(() => {
      this.UserSvc.init();
    });
  }

  protected handleRowClicked(event: DxDataGridTypes.RowClickEvent): void {
    const IdUser = event.data as User
    const modalRef = this.modalSvc.open(UserModalComponent);
    (modalRef.componentInstance as UserModalComponent).UserIdToEdit = IdUser.id;

    modalRef.closed.subscribe(() => {
      this.UserSvc.init();
    });
  }

  protected onDeleteClick = (e: any) => {
   
    e.event.stopPropagation();

    const id = e.row.data.id;
    this.UserSvc.deleteUser(id);
  };
  
  protected readonly contractData = computed(() => {

  const users = this.UserSvc.User();

  const counts: Record<number, number> = {
    0: 0,
    1: 0,
    2: 0
  };

  users.forEach(u => {
    counts[u.contract]++;
  });

  return this.contractTypes.map(c => ({
    type: c.text,
    value: counts[c.id]
  }));

});
}
