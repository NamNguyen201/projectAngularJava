/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocationScreen2Component } from './location-screen2.component';

describe('LocationScreen2Component', () => {
  let component: LocationScreen2Component;
  let fixture: ComponentFixture<LocationScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
