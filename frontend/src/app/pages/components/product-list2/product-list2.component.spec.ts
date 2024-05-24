/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductList2Component } from './product-list2.component';

describe('ProductList2Component', () => {
  let component: ProductList2Component;
  let fixture: ComponentFixture<ProductList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
