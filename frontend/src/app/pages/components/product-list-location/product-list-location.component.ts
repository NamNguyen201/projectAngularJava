import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { LocationPageModel } from '../../models/location-page';

@Component({
  selector: 'app-product-list-location',
  templateUrl: './product-list-location.component.html',
  styleUrls: ['./product-list-location.component.scss']
})
export class ProductListLocationComponent implements OnInit {
  private page = 0;
  public locations!: LocationPageModel;

  constructor(private location: LocationService) { }

  ngOnInit() {
    this.getAllLocation();
  }

  public getAllLocation(): void{
    this.location.getAlllocation(this.page).subscribe(
      (response) =>{
        this.locations = response;
        // console.log(response);
      }
    )}
}
