import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductList2Component } from './components/product-list2/product-list2.component';
import { ProductListProductComponent } from './components/product-list-product/product-list-product.component';
import { ProductListOwnerComponent } from './components/product-list-owner/product-list-owner.component';
import { ProductListSupplierComponent } from './components/product-list-supplier/product-list-supplier.component';
import { ProductListWareHouseComponent } from './components/product-list-wareHouse/product-list-wareHouse.component';
import { ProductListLocationComponent } from './components/product-list-location/product-list-location.component';
import { ProductListInventoryStatusComponent } from './components/product-list-inventoryStatus/product-list-inventoryStatus.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginUserComponent } from './components/loginUser/loginUser.component';



const routes: Routes = [
  {path: 'list', component: ProductListComponent},
  {path: 'list2', component: ProductList2Component},
  {path: 'product', component: ProductListProductComponent},
  {path: 'owner', component: ProductListOwnerComponent},
  {path: 'supplier', component: ProductListSupplierComponent},
  {path: 'wareHouse', component: ProductListWareHouseComponent},
  {path: 'location', component: ProductListLocationComponent},
  {path: 'inventoryStatus', component: ProductListInventoryStatusComponent},
  {path: 'chart', component: ChartComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
