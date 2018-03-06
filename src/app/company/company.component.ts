import { Component, OnInit } from '@angular/core';
import { PricesService } from '../prices.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private pricesService: PricesService) { }

  ngOnInit() {
  }

}
