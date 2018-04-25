import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBjymPpMdP7T8M1qXgcfD5y4Q29_rQTqew",
      authDomain: "examples-4aa45.firebaseapp.com",
      databaseURL: "https://examples-4aa45.firebaseio.com",
      projectId: "examples-4aa45",
      storageBucket: "examples-4aa45.appspot.com",
      messagingSenderId: "903270211637"
    })
  ],
})
export class HomePageModule {}
