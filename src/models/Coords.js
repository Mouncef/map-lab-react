export default class Coords {

    name:string;
    job:string;
    address:string;
    lat:number;
    long:number;


    constructor(lat, long, name, job, address) {
        this.address = address;
        this.lat = lat;
        this.long = long;
    }
}