import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPageModel } from '../models/product-page';
import { ApiPath } from '@core/config';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAllProduct(page: number): Observable<ProductPageModel>{
    return this.http.get<ProductPageModel>(`${ApiPath.RETURN_OUTPUT_LIST_PRODUCT}?page=${page}`)
  }

  public findSearchAndPage(product: string, pageNumber: number): Observable<ProductPageModel>{
    return this.http.get<ProductPageModel>(`${ApiPath.RETURN_OUTPUT_SHOW_PAGE_SEARCH_PRODUCT}?any=${product}&page=${pageNumber}`);
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_PRODUCT}`,product);
  }

  public updateProduct(product: Product): Observable<Product>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_PRODUCT}`, product);
  }

  public deleteProduct(productId: number): Observable<void>{
    return this.http.delete<void>(`${ApiPath.RETURN_OUTPUT_DELETE_PRODUCT}/${productId}`);
  }

  public findNameByCode(code: string): Observable<Product>{
    return this.http.get<Product>(`${ApiPath.RETURN_OUTPUT_FINDNAMEBYCODE_PRODUCT}/${code}`);
  }

}
