/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductTableScreen3Component } from './product-table-screen3.component';

describe('ProductTableScreen3Component', () => {
  let component: ProductTableScreen3Component;
  let fixture: ComponentFixture<ProductTableScreen3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTableScreen3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableScreen3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
