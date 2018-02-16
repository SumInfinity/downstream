import { Component, OnDestroy, OnInit } from '@angular/core';
import { PricesService } from '../prices.service';
import { Observable } from 'rxjs/Observable';
import { Company } from '../company';
import { SnapshotAction } from 'angularfire2/database';
import { AngularFireAction } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {

  public stockCompanies: Observable<{}[]>;
    public newCompany ;
    constructor(private pricesService: PricesService) {
        this.newCompany = new Company('');
    }

    ngOnInit() {
        this.stockCompanies = this.pricesService.getStocks();
    }

    remove(company: Company) {
        console.log('trying to delete company');
        console.log(company);
        this.pricesService.deleteStock(company);
    }

    update(company: Company) {
        console.log(company);
        this.pricesService.updateStock(company);
    }
    saveCompany(company: Company, product: string, place: string) {
        company.updated();
        this.pricesService.createStock(company);
        this.emptyObject();
    }
    emptyObject() {
        this.newCompany = new Company('');
    }

    confirmTodaysData() {
        this.saveYesterdaysData();
    }

    saveYesterdaysData() {
        this.pricesService.saveYesterdaysData();
    }
    ngOnDestroy() {

    }

}

