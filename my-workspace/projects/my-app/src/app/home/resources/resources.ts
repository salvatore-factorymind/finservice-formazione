import { Component, inject } from '@angular/core';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { UserService } from '../../shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';

import { User } from '../../shared/models/models';
import { UserModalComponent } from '../../shared/modals/user-modals/user-modal.component';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.html',
  styleUrl: './resources.css',
  imports: [DxDataGridModule, TranslatePipe]
})
export class Resources {
  protected readonly UserSvc = inject(UserService)
  private readonly modalSvc = inject(NgbModal) 

  protected handleNewUser():void{
    const modalRef = this.modalSvc.open(UserModalComponent);
    (modalRef.componentInstance as UserModalComponent).UserIdToEdit = 0;
  }

  protected handleRowClicked(event: DxDataGridTypes.RowClickEvent) {
    const IdUser = event.data as User
    const modalRef = this.modalSvc.open(UserModalComponent);
    (modalRef.componentInstance as UserModalComponent).UserIdToEdit = IdUser.id;
}
}
