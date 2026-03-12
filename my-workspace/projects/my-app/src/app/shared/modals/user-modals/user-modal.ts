import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'

import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ContractType, User } from '../../models/user-model';
import { TranslatePipe } from '@ngx-translate/core';
import { FormUserContractComponent } from "../../components/form-user-contract/form-user-contract/form-user-contract.component";



@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.html',
  imports: [ReactiveFormsModule, FormsModule, TranslatePipe, FormUserContractComponent]
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
        contract: new FormControl<ContractType | null>({value: ContractType.Intern, disabled:false})
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

      const adultDate = new Date(
        now.getFullYear() - 18,
        now.getMonth(),
        now.getDate()
      );

      console.log(adultDate)

      if (date >= adultDate){
        return { birthDate: true};
      }
      return null
    }
}


