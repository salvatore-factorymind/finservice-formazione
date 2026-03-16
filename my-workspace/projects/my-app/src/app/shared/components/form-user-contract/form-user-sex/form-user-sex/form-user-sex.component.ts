import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SexType } from '../../../../models/user-model';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-form-user-sex',
  templateUrl: './form-user-sex.component.html',
  styleUrls: ['./form-user-sex.component.css'],
  imports:[TranslatePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormUserSexComponent),
      multi: true
    }
  ]
})
export class FormUserSexComponent implements ControlValueAccessor{
  protected readonly SexType = SexType;
    protected readonly value = signal<SexType | null | undefined> (undefined)
  
    protected disabled =signal(false)
  
    private changeFn?: (value: SexType | null | undefined) => void;
    private touchedFn?:() => void;
  
    public writeValue(value: SexType): void {
      this.value.set(value);
    } //arriva il valore dalla form
  
    public registerOnChange (fn: (value: SexType | null | undefined) => void): void {
      this.changeFn = fn;
    }
  
    public registerOnTouched(fn: () => void): void {
      this.touchedFn = fn; 
    }
  
    public setDisabledState(isDisable: boolean): void {
      this.disabled.set(isDisable);
    }//metodi standard
  
    protected handleValueChanged(value: SexType): void{
      this.value.set(value);
      if(this.changeFn){
        this.changeFn(value)
      }
          if(this.touchedFn){
        this.touchedFn()
      }
    }
}
