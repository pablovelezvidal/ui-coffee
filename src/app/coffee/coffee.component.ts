import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Coffee } from '../logic/Coffee';
import { GeoLocationService } from '../services/geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private geolaction: GeoLocationService,
    private data: DataService,
    private router: Router
  ) { }

  coffee: Coffee;

  tastingEnabled: boolean = false;

  types = ["Americano", "Expresso", "Capuccino", "Mocaccino"];

  routingSubscription: any;

  resetRatings(checked) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating;
    } else {
      this.coffee.tastingRating = null;
    }
  }

  cancel() {
    this.router.navigate(["/"]);
  }

  save() {
    this.data.save(this.coffee, result => {
      if (result) {
        this.router.navigate(["/"]);
      } else {
        console.log("there was a problem saving the coffee");
      }
    });
  }

  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription = 
      this.route.params.subscribe(params => {
        if(params['id']) {
          this.data.getOne(params['id'], response => {
            this.coffee = response;
            if (this.coffee.tastingRating) {
              this.tastingEnabled = true;
            }
          })
        }
      });

      this.geolaction.requestLocation(location => {
        if (location) {
          this.coffee.location.latitude = location.latitude;
          this.coffee.location.longitude = location.longitude;
        }
      }) 
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
