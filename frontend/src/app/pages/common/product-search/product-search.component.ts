import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  constructor() { }
  @Output() searchString= new EventEmitter<string>();
  @Output() resetList = new EventEmitter();
  searchValue: string | undefined;
  ngOnInit() {

  }
  
  public getValueSearch(){
    this.searchString.emit(this.searchValue);
  }

  public onResetList(): void{
    // this.searchValue = '';
    this.resetList.emit();
  }
}
