/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SupplierScreen2Component } from './supplier-screen2.component';

describe('SupplierScreen2Component', () => {
  let component: SupplierScreen2Component;
  let fixture: ComponentFixture<SupplierScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
