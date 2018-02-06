import { Component, OnDestroy, OnInit } from '@angular/core';
import { PricesService } from '../prices.service';
import { Observable } from 'rxjs/Observable';
import { Company } from '../company';
import { SnapshotAction } from 'angularfire2/database';

@Component({
    selector: 'app-edit-prices',
    templateUrl: './edit-prices.component.html',
    styleUrls: ['./edit-prices.component.css']
})
export class EditPricesComponent implements OnInit, OnDestroy {

    public depotCompanies: Observable<SnapshotAction[]>;
    public pumpCompanies: Observable<SnapshotAction[]>;
    public newCompany ;
    public depotView: string;
    public pumpView: string;
    constructor(private pricesService: PricesService) {
        this.newCompany = new Company('');
    }

    ngOnInit() {
        this.depotCompanies = this.pricesService.getPricesWithSnapshot('pms', 'depot');
        this.pumpCompanies = this.pricesService.getPricesWithSnapshot('pms', 'pump');
        this.pumpView = 'pms';
        this.depotView = 'pms';
    }

    switchDepotView(product: string) {
        console.log('switching depot view');
        this.depotView = product;
        this.depotCompanies = this.pricesService.getPricesWithSnapshot(product, 'depot');
    }

    switchPumpView(product: string) {
        console.log('switching pump view');
        this.pumpView = product;
        this.pumpCompanies = this.pricesService.getPricesWithSnapshot(product, 'pump');
    }

    remove(company: Company) {
        console.log('trying to delete company');
        console.log(company);
        this.pricesService.deletePrice(company);
    }

    update(company: Company) {
        console.log(company);
        this.pricesService.updatePrice(company);
    }
    saveCompany(company: Company, product: string, place: string) {
        company.updated();
        this.pricesService.createPrice(company, product, place);
        this.emptyObject();
    }
    emptyObject() {
        this.newCompany = new Company('');
    }

    confirmTodaysData() {

    }

    updateTableExtremes() {
        this.pricesService.crunchedData();
    }

    ngOnDestroy() {

    }

}
