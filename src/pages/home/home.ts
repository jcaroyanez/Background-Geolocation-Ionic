import { Component, NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { AngularFirestore } from "angularfire2/firestore";

export interface LocationB{
  latitude?:number;
  longitude?:number;
}
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AngularFirestore]
})
export class HomePage {

  logs: string[] = [];
  info:LocationB = {};

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private _ngZone: NgZone,
    private afs: AngularFirestore
  ) { }

  ionViewDidLoad() {

  }

  startBackgroundGeolocation() {
    this.backgroundGeolocation.isLocationEnabled()
      .then((rta) => {
        if (rta) {
          this.start();
        } else {
          this.backgroundGeolocation.showLocationSettings();
        }
      })
  }

  start() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 1,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true,
      stopOnTerminate: false,
      // Android only section
      locationProvider: 1, // https://github.com/mauron85/cordova-plugin-background-geolocation/blob/master/PROVIDERS.md
      startForeground: true,
      interval: 6000,
      fastestInterval: 2000,
      activitiesInterval: 10000,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      notificationIconColor: '#FEDD1E',
      notificationIconLarge: 'mappointer_large',
      notificationIconSmall: 'mappointer_small'
    };


    this.backgroundGeolocation
      .configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this._ngZone.run(() => {

          this.info.latitude = location.latitude;
          this.info.longitude = location.longitude;

          this.afs.collection('location').add(this.info).then((value) => {
            console.log('nike');
          }).catch((error) => {
            console.log('error',error);
          });

          this.logs.push(`${location.latitude},${location.longitude}`);
        });
      });

    // start recording location
    this.backgroundGeolocation.start();

  }

  stopBackgroundGeolocation() {
    this.backgroundGeolocation.stop();
  }

}
