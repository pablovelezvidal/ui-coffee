import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GeoLocationService } from './services/geolocation.service';
import { DataService } from './services/data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatButtonModule, MatIconModule, MatInputModule, 
  MatSelectModule, MatSliderModule, MatToolbarModule, 
  MatCardModule, MatSlideToggleModule, MatSnackBarModule } from '@angular/material';

  import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';

import 'hammerjs';
import { ListComponent } from './list/list.component';
import { CoffeeComponent } from './coffee/coffee.component';

import {Routes, RouterModule} from '@angular/router';

import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'coffee', component: CoffeeComponent},
  {path: 'coffee/:id', component: CoffeeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MatButtonModule, MatIconModule, MatInputModule, 
    MatSelectModule, MatSliderModule, MatToolbarModule, 
    MatCardModule, MatSlideToggleModule, BrowserModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [GeoLocationService, DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
