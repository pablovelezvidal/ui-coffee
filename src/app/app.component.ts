import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private snackBar: MatSnackBar,
    private ngsw: SwUpdate
  ) {

  }

  updateNetworkStatusUI() {
    if(navigator.onLine) {
      (document.querySelector("body") as any).style = "";
    } else {
      (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
  }


  ngOnInit() {

    //Checking SW update status
    this.ngsw.available.subscribe(update => {
      console.log('[App] Update available: current version is', update.current, 'available version is', update.available);
      let snackBarRef = this.snackBar.open('Newer version of the app is available', 'Refresh', {duration: 5000});

      snackBarRef.onAction().subscribe(() => {
        location.reload()
      });

    });

    //checking Network status
    this.updateNetworkStatusUI();

    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);

    /*
    * Checking Installation status
    * Validate if we are in a mobile device and if we are checking the browser so ask for installation
    */
    if ((navigator as any).standalone ==false) {
      //This is an IOS Device because shows standalone ==false and we are in the browser
      this.snackBar.open("You can add this app to your home screen", "", 
      {duration: 3000});
    }

    if ((navigator as any).standalone ==undefined) {
      //It's not IOS device
      if(window.matchMedia("(display-mode: browser").matches) {
        //We are showing the app in a browser
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sbInstall = this.snackBar.open("Do you want to install this app?", "Install", {duration: 5000}); 
          sbInstall.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then( result => {
              if (result.outcome == "dismissed") {
                //TODO: track NO installation
              } {
                //TODO: tranck installation
              }
            });
          })
          return false;
        })

      } 

    }

  }

}
