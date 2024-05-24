/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WareHouseScreen2Component } from './wareHouse-screen2.component';

describe('WareHouseScreen2Component', () => {
  let component: WareHouseScreen2Component;
  let fixture: ComponentFixture<WareHouseScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareHouseScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareHouseScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
