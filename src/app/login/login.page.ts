import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() isModal: boolean = false;

  constructor(private router: Router, private faio: FingerprintAIO, private modelCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  login() {
    //Check if Fingerprint or Face  is available
    this.faio.isAvailable()
      .then((result:any) => {
        console.log(result);
        if (result === "finger" || result === "face") {
          //Fingerprint or Face Auth is available
          console.log("Fingerprint or Face Exist!")
          this.faio.show({         
            clientId: 'IonicBiometricAuthApp',
            clientSecret: 'password', //Only necessary for Android
            disableBackup: true,  //Only for Android(optional)
            localizedFallbackTitle: 'Use Pin', //Only for iOS
            localizedReason: 'Please authenticate' //Only for iOS

          })
            .then((result: any) => {
              console.log(result);
              if (result == "Success") {
                //Fingerprint/Face was successfully verified            
                //Go to dashboard
                if (this.isModal) {
                  this.modelCtrl.dismiss();
                } else {
                  this.router.navigateByUrl("/home");
                }
              }
              else {
                //Fingerprint/Face was not successfully verified                      
                this.presentAlert(result);
                console.log(result);
              }
            })
            .catch((error: any) => {
              //Fingerprint/Face was not successfully verified          
              this.presentAlert(error);
              console.log(error);
            });
        }
        else {
          //Fingerprint or Face Auth is not available        
          this.presentAlert("Fingerprint/Face Auth is not available on this device!");
          console.log("Fingerprint/Face Auth is not available on this device!")
        }
      });


  }



  //Show popup alert
  async presentAlert(msg: string) {
    const alert = this.alertCtrl.create({
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ],
      header: 'alert',
      message: msg,
    });
    await alert.then(alert => alert.present());

  }

}
