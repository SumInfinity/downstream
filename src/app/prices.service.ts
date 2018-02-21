import { Injectable } from '@angular/core';
import {
  AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot,
  SnapshotAction
} from 'angularfire2/database';
import { Company } from './company';
import { Observable } from 'rxjs/Observable';

/** all the logic for data storing goes here */
@Injectable()
export class PricesService {
  public depotRef: AngularFireList<any>;
  public companies: Observable<any[]>;
  public rawCompanies: Observable<SnapshotAction[]>;
  public rawStocks: Observable<SnapshotAction[]>;
  public productAverages: any = { ago: 0, dpk: 0, pms: 0 };
  public crunched = {
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



  constructor(private db: AngularFireDatabase) {

  }
  //+++ PRICES +++ //
  // --create
  createPrice(company: Company, product: string, place: string) {
    this.depotRef = this.db.list('prices/' + place + '/' + product);
    this.depotRef.push(company).then((success) => {
      console.log('company added successfully');
      console.log(success);
    }, (error) => {
      console.log('error adding company');
      console.log(error);
    });

  }
  // get prices as a simple Observable without keys
  getPrices(product: string, place: string) {
    this.depotRef = this.db.list('prices/' + place + '/' + product);
    this.companies = this.depotRef.valueChanges();
    return this.companies;
  }

  updatePrice(company: Company) {
    this.createDbRef(company).update(company.key, company);
  }


  deletePrice(company: Company) {
    this.createDbRef(company).remove(company.key);
  }

  getPricesWithSnapshot(product: string, place: string) {
    this.depotRef = this.db.list('prices/' + place + '/' + product);
    this.rawCompanies = this.depotRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, product: product, place: place, ...c.payload.val() }));
    });
    return this.rawCompanies;
  }
  // --end prices //

  //+++ STOCKS ++ //
  // get prices with keys and content //
  createStock(company: Company) {
    const stocksRef = this.db.list('stocks');
    stocksRef.push(company).then((success) => {
      console.log('company added successfully');
      console.log(success);
    }, (error) => {
      console.log('error adding company');
      console.log(error);
    });

  }

  // get stocks as a simple Observable without keys
  getStocks() {
    const stocksRef = this.db.list('stocks');
    return stocksRef.valueChanges();
  }
  // get stocks with their list keys

  updateStock(company: Company) {
    this.db.list('stocks').update(company.key, company);
  }

  deleteStock(company: Company) {
    this.db.list('stocks').remove(company.key);
  }

  getStockWithSnapshot() {
    const stocksRef = this.db.list('stocks');
    this.rawStocks = stocksRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.rawStocks;
  }

  // --end stocks --//

  createDbRef(company): AngularFireList<any> {
    return this.db.list('prices/' + company.place + '/' + company.product);
  }




  updateTableExtremes() {
    const ref = this.db.object('crunched');
    ref.set(this.crunched);
  }

  getTableExtremes() {
    const ref = this.db.object('crunched');
    return ref.valueChanges();

  }
  saveYesterdaysData() {
    console.log('saving yesterdays data');
    const ref = this.db.object('modified_on');
    ref.set(Date.now());
    const fullCompanyPricesRef = this.db.object('companies');
    this.savePricesReturnAverage('pms', 'depot');
    this.savePricesReturnAverage('ago', 'depot');
    this.savePricesReturnAverage('dpk', 'depot');
    this.savePricesReturnAverage('pms', 'pump');
    this.savePricesReturnAverage('ago', 'pump');
    this.savePricesReturnAverage('dpk', 'pump');
  }

  savePricesReturnAverage(product, place) {
    this.getPricesWithSnapshot(product, place).subscribe((companies: any[]) => {
      for (let company of companies) {
        const companyRef = this.db.list('companies/' + company.short_name + '/' + company.place + '/' + company.product);
        companyRef.push(company.price);
      }
    });
  }


  pushNewChartData(value: number, product: string) {
    /* the next phase is to retrieve this list as a list
    and not an object */
    switch (product) {
      case 'ago':
        const chartDataAGORef = this.db.list('chart/depot/data/-L5n81euC0Z5-9RaL_s-/data').push(value);
        break;

      case 'pms':
        const chartDataPMSRef = this.db.list('chart/depot/data/-L5n81epOYVnit9h6yj1/data').push(value);
        break;

      case 'dpk':
        const chartDataDPKRef = this.db.list('chart/depot/data/-L5n81ewHRgbq1ajSQRh/data').push(value);
        break;
    }
  }

  chartData() {
    return this.db.list('chart/depot/data').valueChanges();
  }
  chartLabels() {
    return this.db.list('chart/depot/labels').valueChanges();
  }

  crunchedData() {
    this.updateTableExtreme('ago');
    this.updateTableExtreme('dpk');
    this.updateTableExtreme('pms', true);
  }

  updateTableExtreme(product: string, last?: boolean) {
    let lowestPrice = 10000;
    let highestPrice = 0;
    let highest: Company;
    let lowest: Company;
    let total = 0;
    let average = 0;
    this.db.list('prices/depot/' + product).valueChanges().subscribe((prices: Company[]) => {
      for (const company of prices) {
        console.log(company);
        if (company.price > highestPrice) {
          highestPrice = company.price;
          highest = company;
        }
        if (company.price < lowestPrice) {
          lowestPrice = company.price;
          lowest = company;
        }
        if (typeof company.price === 'number') {
          total += company.price;
        }
      }
      average = (total / prices.length);
      this.crunched.depot.highest[product] = highest;
      this.crunched.depot.lowest[product] = lowest;
      this.crunched.depot.average[product].value = average;
      /* this should be done only once when all has been finished */
      this.updateTableExtremes();
      this.pushNewChartData(average, product);
      if (last) {
        const chartLabelsRef = this.db.list('chart/depot/labels').push(Date.now());
      }
    });
  }
}
