import { Component, OnInit } from '@angular/core';
import { PricesService } from "../prices.service";

@Component({
  selector: 'app-price-analysis',
  templateUrl: './price-analysis.component.html',
  styleUrls: ['./price-analysis.component.css']
})
export class PriceAnalysisComponent implements OnInit {
  public $month = 'July';
  
  constructor(private pricesService: PricesService) { }

  ngOnInit() {
  }

}
