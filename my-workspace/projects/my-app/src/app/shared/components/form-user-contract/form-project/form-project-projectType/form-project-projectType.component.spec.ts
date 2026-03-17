/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormProjectProjectTypeComponent } from './form-project-projectType.component';

describe('FormProjectProjectTypeComponent', () => {
  let component: FormProjectProjectTypeComponent;
  let fixture: ComponentFixture<FormProjectProjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProjectProjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProjectProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
