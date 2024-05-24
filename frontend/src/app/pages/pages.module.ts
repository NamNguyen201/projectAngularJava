import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductSearchComponent } from './common/product-search/product-search.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductTableScreen3Component } from './components/product-table-screen3/product-table-screen3.component';
import { MatRadioModule } from '@angular/material/radio';
import { Screen2DialogComponent } from './components/screen2-add-dialog/screen2-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductList2Component } from './components/product-list2/product-list2.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductScreen2Component } from './components/product-screen2/product-screen2.component';
import { ProductListProductComponent } from './components/product-list-product/product-list-product.component';
import { OwnerScreen2Component } from './components/owner-screen2/owner-screen2.component';
import { ProductListOwnerComponent } from './components/product-list-owner/product-list-owner.component';
import { SupplierScreen2Component } from './components/supplier-screen2/supplier-screen2.component';
import { ProductListSupplierComponent } from './components/product-list-supplier/product-list-supplier.component';
import { WareHouseScreen2Component } from './components/wareHouse-screen2/wareHouse-screen2.component';
import { ProductListWareHouseComponent } from './components/product-list-wareHouse/product-list-wareHouse.component';
import { ProductListLocationComponent } from './components/product-list-location/product-list-location.component';
import { LocationScreen2Component } from './components/location-screen2/location-screen2.component';
import { InventoryStatusScreen2Component } from './components/inventoryStatus-screen2/inventoryStatus-screen2.component';
import { ProductListInventoryStatusComponent } from './components/product-list-inventoryStatus/product-list-inventoryStatus.component';
import { Screen2EditDialogComponent } from './components/screen2-edit-dialog/screen2-edit-dialog.component';
import { EditTTDialogComponent } from './common/editTT-dialog/editTT-dialog.component';
import { SeparateDialogScreen2Component } from './components/separate-dialog-screen2/separate-dialog-screen2.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartComponent } from './components/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ApextChartComponent } from './components/apext-chart/apext-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoginUserComponent } from './components/loginUser/loginUser.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PagesComponent,
    ProductTableComponent,
    ProductListComponent,
    ProductSearchComponent,
    ProductTableScreen3Component,
    Screen2DialogComponent,
    ProductList2Component,
    ProductScreen2Component,
    ProductListProductComponent,
    OwnerScreen2Component,
    ProductListOwnerComponent,
    SupplierScreen2Component,
    ProductListSupplierComponent,
    WareHouseScreen2Component,
    ProductListWareHouseComponent,
    ProductListLocationComponent,
    LocationScreen2Component,
    InventoryStatusScreen2Component,
    ProductListInventoryStatusComponent,
    Screen2EditDialogComponent,
    EditTTDialogComponent,
    SeparateDialogScreen2Component,
    ChartComponent,
    ApextChartComponent,
    LoginUserComponent
   
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatFormFieldModule,
    TranslateModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    NgChartsModule,
    NgApexchartsModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class PagesModule { }
