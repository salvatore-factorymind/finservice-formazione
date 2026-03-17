import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core';

import { ProjectService } from '../../service/project.service';
import { Project, ProjectType } from '../../models/project-model';
import { FormProjectProjectTypeComponent } from '../../components/form-user-contract/form-project/form-project-projectType/form-project-projectType.component';
 
 
 
@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.html',
  imports: [ReactiveFormsModule, FormsModule, TranslatePipe, FormProjectProjectTypeComponent]
})
 
export class ProjectModalComponent implements OnInit{
 
  public projectIdToEdit: number| undefined;
 
  protected readonly activeModal = inject(NgbActiveModal);
 
  protected projectSvc = inject(ProjectService);
 
  protected readonly formGroup = new FormGroup({
    id: new FormControl<number | null>({value:null,disabled:true}),
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    dateStart: new FormControl<Date | null>(null, Validators.required),
    dateFinish: new FormControl<Date | null>(null, [Validators.required, validDateFinish()]),
    type: new FormControl<ProjectType | null>({value: ProjectType.Ecommerce, disabled:false})
  });
 
  public ngOnInit(): void {
    const projectId = this.projectIdToEdit || 0;
 
    const projectToEdit = this.projectSvc.Project().find(project => project.id === projectId);
 
    if(!!projectToEdit){
      this.formGroup.patchValue(projectToEdit);
    }
  }
 
  protected handleSubmitProject(): void{
    const formValue = this.formGroup.getRawValue() as Project;
 
    this.projectSvc.saveProject(formValue);
 
    this.activeModal.close({hasChanges: true});
  }
}
 
export function validDateFinish(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent) {
      return null;
    }

    const dateStart = control.parent.get('dateStart')?.value;
    const dateFinish = control.value;

    if (!dateStart || !dateFinish) {
      return null;
    }

    const start = new Date(dateStart);
    const finish = new Date(dateFinish);

    if (finish <= start) {
      return { dateF: true };
    }

    return null;
  };
}