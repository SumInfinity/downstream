export class Company {
    public long_name: string;
    public short_name: string;
    public views: number;
    public price: number;
    public created_on: any;
    public modified_on: any;
    public key?: string;

    public constructor(name: string) {
        this.long_name = name;
        this.short_name = this.long_name.substr(0, 5);
        this.views = 0;
        this.price = 0;
        this.created_on = Date.now();
        this.modified_on = Date.now();
    }
    public updated() {
        console.log('updating this company from model');
        this.modified_on = Date.now();
    }

}
