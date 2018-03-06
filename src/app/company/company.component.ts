import { Component, OnInit } from '@angular/core';
import { PricesService } from '../prices.service';
import { AngularFireList } from "angularfire2/database";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public prices : AngularFireList<any> ;
  public companyId: string;

  constructor(private pricesService: PricesService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.companyId = this.activeRoute.snapshot.params['id'];
    this.prices = this.pricesService.getSingleCompany(this.companyId);
    //TODO: deciper company model and insert it here
  }

}
