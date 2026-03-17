import { Component, forwardRef, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectType } from '../../../../models/project-model';

@Component({
  selector: 'app-form-project-projectType',
  templateUrl: './form-project-projectType.component.html',
  styleUrls: ['./form-project-projectType.component.css'],
  imports:[TranslatePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormProjectProjectTypeComponent),
      multi: true
    }
  ]
})
export class FormProjectProjectTypeComponent implements ControlValueAccessor {
  protected readonly ProjectType = ProjectType;
  protected readonly value = signal<ProjectType | null | undefined> (undefined)

  protected disabled =signal(false)

  private changeFn?: (value: ProjectType | null | undefined) => void;
  private touchedFn?:() => void;

  public writeValue(value: ProjectType): void {
    this.value.set(value);
  } //arriva il valore dalla form

  public registerOnChange (fn: (value: ProjectType | null | undefined) => void): void {
    this.changeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touchedFn = fn; 
  }

  public setDisabledState(isDisable: boolean): void {
    this.disabled.set(isDisable);
  }//metodi standard

  protected handleValueChanged(value: ProjectType): void{
    this.value.set(value);
    if(this.changeFn){
      this.changeFn(value)
    }
        if(this.touchedFn){
      this.touchedFn()
    }
  }


}
