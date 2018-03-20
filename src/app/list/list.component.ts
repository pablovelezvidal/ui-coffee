import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Coffee } from '../logic/Coffee';
import { Router } from '@angular/router';
import { GeoLocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list : [Coffee];

  constructor(
    private data: DataService, 
    private router: Router,
    private geolocation: GeoLocationService
  ) { }

  getDetails(coffee: Coffee) {
    this.router.navigate(["/coffee", coffee._id]);
  }

  goMap(coffee:Coffee) {
    const mapUrl = this.geolocation.getMapLink(coffee.location);
    location.href = mapUrl;
  }

  share(coffee: Coffee) {
    const mapUrl = this.geolocation.getMapLink(coffee.location);
    const shareText = `I had this coffee ${window.location.href}/coffee/${coffee._id} 
     at ${coffee.place} and for me is a ${coffee.rating} stars coffee!
     view site: ${mapUrl}`;
    if ("share" in navigator) {
      (navigator as any).share({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then(() => console.log("shared")).catch(() => console.log("error sharing"));
    } else {
      const shareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareUrl;
    }
  }

  ngOnInit() {
    this.data.getList(list => {
      this.list = list;
    })
  }

}
