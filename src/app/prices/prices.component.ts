import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PricesService } from '../prices.service';
import { Company } from '../company';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
})
export class PricesComponent implements OnInit, OnDestroy {
  public depotCompanies: Observable<Company[]>;
  public pumpCompanies: Observable<Company[]>;
  public crunched: Subscription;
  public crunchedData: any = {
    depot: {
      average: { ago: { value: 0 }, dpk: { value: 0 }, pms: { value: 0 } },
      highest: {
        ago: new Company(''),
        dpk: new Company(''),
        pms: new Company('')
      },
      lowest: {
        ago: new Company(''),
        dpk: new Company(''),
        pms: new Company(''),
      }
    },
    pump: {
      average: { ago: { value: 0 }, dpk: { value: 0 }, pms: { value: 0 } },
      highest: {
        ago: new Company(''),
        dpk: new Company(''),
        pms: new Company('')
      },
      lowest: {
        ago: new Company(''),
        dpk: new Company(''),
        pms: new Company(''),
      }
    }
  };
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private pricesService: PricesService) { }

  ngOnInit() {
    this.depotCompanies = this.pricesService.getPrices('pms', 'depot');
    this.pumpCompanies = this.pricesService.getPrices('pms', 'pump');
    this.crunched = this.pricesService.getTableExtremes().subscribe((tableExtremes) => {
      this.crunchedData = tableExtremes;
    });

    this.pricesService.chartDataValue().subscribe((data) => {
      this.lineChartData = data;
    });
    this.pricesService.chartLabelsValue().subscribe((labels) => {
      this.lineChartLabels = labels;
    });
  }

  switchDepotView(product: string) {
    console.log('switching depot view  to ' + product);
    console.log(this.lineChartData);
    this.depotCompanies = this.pricesService.getPrices(product, 'depot');
  }

  switchPumpView(product: string) {
    console.log('switching pump view');

    this.pumpCompanies = this.pricesService.getPrices(product, 'pump');
  }

  ngOnDestroy() {

  }

}
