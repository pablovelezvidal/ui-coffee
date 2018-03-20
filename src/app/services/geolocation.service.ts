import { Injectable } from '@angular/core';
import { browser } from 'protractor';
import { PlaceLocation } from '../logic/PlaceLocation';

@Injectable()
export class GeoLocationService {

  constructor() { }

  requestLocation(callback) {
    //W3C Geolocation API
    navigator.geolocation.getCurrentPosition(
      position => {
        callback(position.coords);
      },
      error => {
        callback(null);
      }
    );

  }

  getMapLink(location: PlaceLocation) {
    //principle of Universal link, will open the native app either on Android or IOS
    let query = "";
    if (location.latitude){
      query = location.latitude + "," + location.longitude;
    } else {
      query = `${location.address},${location.city}`;
    }

    if (/iPad|iPod|iPhone/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;

    }
  }

}
