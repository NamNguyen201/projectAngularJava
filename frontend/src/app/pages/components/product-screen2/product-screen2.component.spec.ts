/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductScreen2Component } from './product-screen2.component';

describe('ProductScreen2Component', () => {
  let component: ProductScreen2Component;
  let fixture: ComponentFixture<ProductScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
