/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeparateDialogScreen2Component } from './separate-dialog-screen2.component';

describe('SeparateDialogScreen2Component', () => {
  let component: SeparateDialogScreen2Component;
  let fixture: ComponentFixture<SeparateDialogScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparateDialogScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparateDialogScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
