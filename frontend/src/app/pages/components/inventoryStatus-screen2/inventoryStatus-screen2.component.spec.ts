/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InventoryStatusScreen2Component } from './inventoryStatus-screen2.component';

describe('InventoryStatusScreen2Component', () => {
  let component: InventoryStatusScreen2Component;
  let fixture: ComponentFixture<InventoryStatusScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryStatusScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStatusScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
