// FaceSnapList sert de parent à FaceSnap, c'est lui qui liste
import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

//Permet d'utiliser un service dans un component, c'est une injection de dependance
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss'],
})
export class FaceSnapListComponent implements OnInit {
  //Déclaration de variables
  faceSnaps!: FaceSnap[];

  // Injection du service dans le constructeur
  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit() {
    this.faceSnaps = this.faceSnapsService.faceSnaps;
  }
}
