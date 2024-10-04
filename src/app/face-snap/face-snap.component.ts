import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss'],
})
// export class FaceSnapComponent implements OnInit {
export class FaceSnapComponent {
  // Le ! ou bang permet de promettre l'initlisaiton à typescript
  // @Input est un décorateur qui permet comme les props en React de dire au component parent qu'il peut recevoir des info du parent
  // Ici on récupère la structure de FaceSanp que l'on peut retrouver dans les models, ça évite de devoir recréer à chaque fois la structure qui ne change pas
  @Input() faceSnap!: FaceSnap;

  //Permet de tester la methode likeFaceSnapById()
  // Il faut l'importer ici
  constructor(private router: Router) {}

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}
