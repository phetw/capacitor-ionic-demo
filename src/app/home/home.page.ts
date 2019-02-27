import { Component, OnInit } from '@angular/core';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken, GeolocationPosition } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  notifications: any = [];
  showAccuracy: boolean = false
  coordinates: GeolocationPosition = {
    coords: {
      accuracy: 0,
      latitude: 0,
      longitude: 0
    }
  }

  ngOnInit() {
    this.getCurrentPosition()
    this.setupPushNotification()
  }

  toggleAccuracy() {
    this.showAccuracy = !this.showAccuracy
  }

  async showIonicDocs() {
    await Plugins.Browser.open({
      url: 'https://ionicframework.com/docs/',
      toolbarColor: '#007ab3',
      windowName: 'Ionic docs ja'
    })
  }

  async showAlert() {
    await Plugins.Modals.alert({
      title: 'Stop',
      message: 'this is an error'
    })
  }

  async getCurrentPosition() {
    this.coordinates = await Plugins.Geolocation.getCurrentPosition()
  }

  setupPushNotification() {
    Plugins.PushNotifications.register()
    Plugins.PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('token ' + token.value);
    });
    Plugins.PushNotifications.addListener('registrationError', (error: any) => {
      console.log('error on register ' + JSON.stringify(error));
    });
    Plugins.PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      console.log('notification ' + JSON.stringify(notification));
      this.notifications.push(notification);
    });

    Plugins.PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      console.log('notification ' + JSON.stringify(notification));
      this.notifications.push(notification);
    });
  }
}
