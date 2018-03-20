import { Injectable } from '@angular/core';
import { PlaceLocation } from '../logic/PlaceLocation';
import { Coffee } from '../logic/Coffee';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  //toca crearle un ngrock al back-end y ponerlo aqui, con el puerto que use el BE
  //otro ng rok a la app con la configuración: ngrok http 4200 -host-header="localhost:4200"
  //servir la app con ng serve --disable-host-check --public-host para que permita otras conexiones
  public endpoint = "http://47c7a01d.ngrok.io"; //"http://192.168.0.25:3000";

  getOne(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response.json());
      })
  }

  getList(callback) {
    this.http.get(`${this.endpoint}/coffees`)
      .subscribe(response => {
        callback(response.json());
      });

  }

  save(coffee, callback) {
    if (coffee._id) {
      //it's an update
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
      .subscribe(response => {
        callback(true);
      });
    } else {
      //it's an insert
      this.http.post(`${this.endpoint}/coffees`, coffee)
      .subscribe(response => {
        callback(true);
      });
    }
  }

}
