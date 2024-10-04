//VERSION AVANT MODIF QUI NECESSITE NEW FACESNAP

// import { Component, OnInit } from '@angular/core';
// import { FaceSnap } from './models/face-snap.model';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {
//   //Déclaration de variables
//   mySnap!: FaceSnap;
//   myOtherSnap!: FaceSnap;
//   myLastSnap!: FaceSnap;

//   ngOnInit() {
//     this.mySnap = new FaceSnap(
//       'Archibald',
//       'Mon meilleur ami depuis tout petit !',
//       'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
//       new Date(),
//       1
//     )
//     this.myOtherSnap = new FaceSnap(
//       'Robot',
//       'Mon petit robot',
//       'https://images.unsplash.com/photo-1691085397730-08669edab7fa?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       new Date(),
//       4
//     )
//     this.myLastSnap = new FaceSnap(
//       'Lego',
//       'Fan de Lego',
//       'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       new Date(),
//       20
//     )
//   }
// }

//AVANT UTILISATION DE *ngFor
// import { Component, OnInit } from '@angular/core';
// import { FaceSnap } from './models/face-snap.model';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {
//   //Déclaration de variables
//   mySnap!: FaceSnap;
//   myOtherSnap!: FaceSnap;
//   myLastSnap!: FaceSnap;

//   ngOnInit() {
//     this.mySnap = {

//       title: 'Archibald',
//       description: 'Mon meilleur ami depuis tout petit !',
//       imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
//       createdDate: new Date(),
//       snaps: 1
//     }

//     this.myOtherSnap = {

//       title: 'Robot',
//       description: 'Mon petit robot',
//       imageUrl: 'https://images.unsplash.com/photo-1691085397730-08669edab7fa?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       createdDate: new Date(),
//       snaps: 5
//     }

//     this.myLastSnap = {

//       title: 'Lego',
//       description: 'Fan de Lego',
//       imageUrl: 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       createdDate: new Date(),
//       snaps: 20,
//       location: 'Paris'
//     }
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
