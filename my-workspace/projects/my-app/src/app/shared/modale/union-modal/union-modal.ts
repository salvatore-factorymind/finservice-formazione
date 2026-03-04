import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { DxDateBoxModule, DxNumberBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxTagBoxModule, DxPopoverModule } from 'devextreme-angular';
import { UnionService } from '../../service/union.service';
import { Union } from '../../models/models';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-union-modal',
  templateUrl: './union-modal.html',
  styleUrls: ['./union-modal.css'],
  imports: [ ReactiveFormsModule, TranslatePipe, DxTextBoxModule, DxNumberBoxModule, DxDateBoxModule, DxTagBoxModule, DxPopoverModule, DxSelectBoxModule, CommonModule],
})
export class UnionModal implements OnInit {
	protected readonly activeModal = inject(NgbActiveModal);
  private readonly unionsSvc = inject(UnionService);
  private readonly usersSvc = inject(UserService);
  private readonly projectsSvc = inject(ProjectService);

  public unionIdToEdit: number | undefined;
  
  protected readonly formGroup = new FormGroup({
    id: new FormControl<number | null>({ value: null, disabled: true}, Validators.required),
    idUser: new FormControl<number | null>(null, Validators.required),
    idProject: new FormControl<number | null>(null, Validators.required),
    hours: new FormControl<number | null>(null, Validators.required),
  });

  protected handleSubmit(): void{
    const formValue = this.formGroup.getRawValue() as Union;
    this.unionsSvc.saveUnion(formValue);

    this.activeModal.close({ hasChanges: true});
  }


  users = this.usersSvc.User;
  projects = this.projectsSvc.Project;

  public ngOnInit(): void {
    const projectId = this.unionIdToEdit || 0;

    const projectIdToEdit = this.unionsSvc.getUnion(projectId);
    if(!!projectIdToEdit) {
      this.formGroup.patchValue(projectIdToEdit);
    }
  }
}
