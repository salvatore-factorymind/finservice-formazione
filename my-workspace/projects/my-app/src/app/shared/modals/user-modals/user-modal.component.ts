import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'

import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/models';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  imports: [ReactiveFormsModule, FormsModule, TranslatePipe]
})

export class UserModalComponent{

    private readonly route = inject(ActivatedRoute)
    protected readonly activeModal = inject(NgbActiveModal)
    protected readonly UserSvc = inject(UserService)
    
    public UserIdToEdit: number | undefined;

    protected readonly FormGroup = new FormGroup({
        id: new FormControl<number | null>({value: null, disabled: true},  Validators.required),
        surname: new FormControl<string | null>(null, Validators.required),
        name: new FormControl<string | null>(null, Validators.required),
        role: new FormControl<string | null>(null, Validators.required),
        dateBirth: new FormControl<Date | null>(null, [Validators.required, validBirthdate()]),
    })

    public ngOnInit(): void {
    const UserId = this.UserIdToEdit

    const UserToEdit = this.UserSvc.User().find(user=> user.id === UserId);
    if(!!UserToEdit){
      this.FormGroup.patchValue(UserToEdit);
    }
    
    
    this.FormGroup.controls.dateBirth.setValidators([
      Validators.required,
      validBirthdate()
    ]);
  }

    protected handleSubmitUser():void{
        const formValue = this.FormGroup.getRawValue() as User;
        this.UserSvc.SaveUser(formValue)

        this.activeModal.close( {hasChanges: true})
        }
    }

export function validBirthdate(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>{
      const date = new Date(control.value);

      const now = new Date();

      if (date >= now){
        return { birthDate: true};
      }
      return null
    }
}


