import { Component, inject, OnInit } from '@angular/core';
import { DxDataGridModule, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingIndicator } from 'my-lib';

import { User } from '../../shared/models/models';
import { UserModalComponent } from '../../shared/modals/user-modals/user-modal.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.html',
  styleUrl: './resources.css',
  imports: [DxDataGridModule, TranslatePipe, LoadingIndicator]
})
export class Resources implements OnInit {
  protected readonly UserSvc = inject(UserService);
  private readonly modalSvc = inject(NgbModal);

  public ngOnInit(): void {
    this.UserSvc.init();
  }

  protected handleNewUser(): void {
    const modalRef = this.modalSvc.open(UserModalComponent);
    (modalRef.componentInstance as UserModalComponent).UserIdToEdit = 0;
  }

  protected handleRowClicked(event: DxDataGridTypes.RowClickEvent): void {
    const IdUser = event.data as User
    const modalRef = this.modalSvc.open(UserModalComponent);
    (modalRef.componentInstance as UserModalComponent).UserIdToEdit = IdUser.id;
  }
}
