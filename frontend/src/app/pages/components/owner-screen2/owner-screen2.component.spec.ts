/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OwnerScreen2Component } from './owner-screen2.component';

describe('OwnerScreen2Component', () => {
  let component: OwnerScreen2Component;
  let fixture: ComponentFixture<OwnerScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
