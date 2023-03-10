import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private modalCtrl: ModalController, private router: Router,private statusBar:StatusBar,private splashScreen:SplashScreen) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //you can use pause or resume events
      this.platform.pause.subscribe(() => {
        if (this.router.url != "/login") {
          this.lockApp();
        }
      });
    });

  }


  async lockApp() {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
      backdropDismiss: false,
      cssClass: 'login-model',
      componentProps: {
        isModal: true
      }
    });

    modal.present();

  }
}
