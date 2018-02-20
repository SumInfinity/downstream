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

  constructor(private db: AngularFireDatabase) {

  }

  getPrices(product: string, place: string) {
    this.depotRef = this.db.list('prices/' + place + '/' + product);
    this.companies = this.depotRef.valueChanges();
    return this.companies;
  }

  getStocks() {
    const stocksRef = this.db.list('stocks');
    return stocksRef.valueChanges();
  }

  getPricesWithSnapshot(product: string, place: string) {
    this.depotRef = this.db.list('prices/' + place + '/' + product);
    this.rawCompanies = this.depotRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, product: product, place: place, ...c.payload.val() }));
    });
    return this.rawCompanies;
  }

  updatePrice(company: Company) {
    this.createDbRef(company).update(company.key, company);
  }

  updateStock(company: Company) {
    this.db.list('stocks').update(company.key, company);
  }

  deletePrice(company: Company) {
    this.createDbRef(company).remove(company.key);
  }
  deleteStock(company: Company) {
    this.db.list('stocks').remove(company.key);
  }

  createDbRef(company): AngularFireList<any> {
    return this.db.list('prices/' + company.place + '/' + company.product);
  }

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
    // const ref = this.db.object('updated');
    // ref.set(Date.now());
    const fullCompanyPricesRef = this.db.object('companies');
    this.savePricesReturnAverage('pms', 'depot');
    this.savePricesReturnAverage('ago', 'depot');
    this.savePricesReturnAverage('dpk', 'depot');
    this.savePricesReturnAverage('pms', 'pump');
    this.savePricesReturnAverage('ago', 'pump');
    this.savePricesReturnAverage('dpk', 'pump');

    this.updateCharts();
  }

  savePricesReturnAverage(product, place) {
    this.getPricesWithSnapshot(product, place).subscribe((companies: any[]) => {
      for (let company of companies) {
        const companyRef = this.db.list('companies/' + company.short_name + '/' + company.place + '/' + company.product );
        companyRef.push(company.price);
      }
    });
  }

  updateCharts() {
    const chartDataRef = this.db.list('chart/depot/data');
    //for each of the dates add the average price for each product
    chartDataRef.push({ data: [65, 59, 80, 81, 56, 55, 40], label: 'Petrol (PMS)' });
    chartDataRef.push({ data: [28, 48, 40, 19, 86, 27, 90], label: 'Diesel (AGO)' });
    chartDataRef.push({ data: [18, 48, 77, 9, 100, 27, 40], label: 'Kerosine (DPK)' });
    const chartLabelsRef = this.db.list('chart/depot/labels');

    chartLabelsRef.push('January');
    chartLabelsRef.push('February');
    chartLabelsRef.push('March');
    chartLabelsRef.push('April');
    chartLabelsRef.push('May');
    chartLabelsRef.push('June');
    chartLabelsRef.push('July');
  }
  chartData() {
    return this.db.list('chart/depot/data').valueChanges();
  }
  chartLabels() {
    return this.db.list('chart/depot/labels').valueChanges();
  }

  crunchedData() {
    /** used for the above table of crunched table extremes */
    let lowestPrice = 10000;
    let highestPrice = 0;
    let highest: Company;
    let lowest: Company;
    let total = 0;
    let average = 0;
    const allAGODepot = this.db.list<Company>('prices/depot/ago').valueChanges().subscribe((prices: Company[]) => {
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
      this.crunched.depot.highest.ago = highest;
      this.crunched.depot.lowest.ago = lowest;
      this.crunched.depot.average.ago.value = average;
      console.log(this.crunched);
      this.updateTableExtremes();
    });
    const allDPKDepot = this.db.list('prices/depot/dpk').valueChanges().subscribe((prices: Company[]) => {
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
      this.crunched.depot.highest.dpk = highest;
      this.crunched.depot.lowest.dpk = lowest;
      this.crunched.depot.average.dpk.value = average;
      console.log(this.crunched);
      this.updateTableExtremes();

    });
    const allPMSDepot = this.db.list('prices/depot/pms').valueChanges().subscribe((prices: Company[]) => {
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
      this.crunched.depot.highest.pms = highest;
      this.crunched.depot.lowest.pms = lowest;
      this.crunched.depot.average.pms.value = average;
      console.log(this.crunched);
      this.updateTableExtremes();
    });
  }
}
