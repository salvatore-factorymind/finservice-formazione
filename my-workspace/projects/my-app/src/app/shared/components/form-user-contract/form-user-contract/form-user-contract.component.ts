import { Component, forwardRef, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ContractType } from '../../../models/user-model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-user-contract',
  templateUrl: './form-user-contract.component.html',
  styleUrls: ['./form-user-contract.component.css'],
  imports:[TranslatePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormUserContractComponent),
      multi: true
    }
  ]
})
export class FormUserContractComponent implements ControlValueAccessor {
  protected readonly ContractType = ContractType;
  protected readonly value = signal<ContractType | null | undefined> (undefined)

  protected disabled =signal(false)

  private changeFn?: (value: ContractType | null | undefined) => void;
  private touchedFn?:() => void;

  public writeValue(value: ContractType): void {
    this.value.set(value);
  } //arriva il valore dalla form

  public registerOnChange (fn: (value: ContractType | null | undefined) => void): void {
    this.changeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touchedFn = fn; 
  }

  public setDisabledState(isDisable: boolean): void {
    this.disabled.set(isDisable);
  }//metodi standard

  protected handleValueChanged(value: ContractType): void{
    this.value.set(value);
    if(this.changeFn){
      this.changeFn(value)
    }
        if(this.touchedFn){
      this.touchedFn()
    }
  }


}
