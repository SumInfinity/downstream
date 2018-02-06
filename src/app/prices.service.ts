import { Injectable } from '@angular/core';
import {
    AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot,
    SnapshotAction
} from 'angularfire2/database';
import { Company } from './company';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PricesService {
    public depotRef: AngularFireList<any>;
    public companies: Observable<any[]>;
    public rawCompanies: Observable<SnapshotAction[]>;
    public crunched = {
        depot: {
            average: { ago: { value: 0} , dpk: { value: 0}, pms: { value: 0} },
            highest: {
                ago: new Company('') ,
                dpk: new Company('') ,
                pms: new Company('')
            },
            lowest: {
                ago: new Company('') ,
                dpk: new Company('') ,
                pms: new Company('') ,
            }
        },
        pump: {
            average: { ago: { value: 54} , dpk: { value: 54}, pms: { value: 54} },
            highest: {
                ago: {company: 'emeka Co', value: 44 },
                dpk: {company: 'emeka Co', value: 54 } ,
                pms:  {company: 'emeka Co', value: 132 }
            },
            lowest: {
                ago: {company: 'emeka Co', value: 23 },
                dpk: {company: 'emeka Co', value: 55 },
                pms:  {company: 'emeka Co', value: 26 }
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

    deletePrice(company: Company) {
        this.createDbRef(company).remove(company.key);
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
    updateTableExtremes() {
        const ref = this.db.object('crunched');
        ref.set(this.crunched);
    }

    getTableExtremes() {
        const ref = this.db.object('crunched');
        return ref.valueChanges();

    }

    crunchedData(): any {
        let lowestPrice = 10000;
        let highestPrice = 0;
        let highest: Company ;
        let lowest: Company;
        let total = 0;
        let average = 0;
        const allAGODepot = this.db.list<Company>('prices/depot/ago').valueChanges().subscribe( (prices: Company[]) => {
            for (const company of prices){
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
        const allDPKDepot = this.db.list('prices/depot/dpk').valueChanges().subscribe( (prices: Company[]) => {
            for (const company of prices){
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
        const allPMSDepot = this.db.list('prices/depot/pms').valueChanges().subscribe( (prices: Company[]) => {
            for (const company of prices){
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
