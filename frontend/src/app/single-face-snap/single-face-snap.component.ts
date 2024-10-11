import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss'],
})
export class SingleFaceSnapComponent implements OnInit {
  // Le ! ou bang permet de promettre l'initlisaiton à typescript
  // @Input est un décorateur qui permet comme les props en React de dire au component parent qu'il peut recevoir des info du parent
  // Ici on récupère la structure de FaceSanp que l'on peut retrouver dans les models, ça évite de devoir recréer à chaque fois la structure qui ne change pas
  // Input a retirer aussi car on ne veut plus lui passer la propriété mais passer par le service
  // @Input() faceSnap!: FaceSnap;
  // faceSnap!: FaceSnap; // Plus besoin car vient Observable à la place
  faceSnap$!: Observable<FaceSnap>;
  isSnapped!: boolean;
  buttonText!: string;

  //Permet de tester la methode likeFaceSnapById()
  // Il faut l'importer ici
  constructor(
    private faceSnapsService: FaceSnapsService,
    // J'ai besoin d'injecter dans mon component la route active, pour recuperer l'id du faceSnap
    //Permet de recuperer dans ngOnInit faceSnapId car on ne peut pas passer par @input qu'on du coup supprimé
    private route: ActivatedRoute
  ) {}

  //Appeler à l'initialisation du component
  ngOnInit() {
    this.prepareInterface();
    this.getFaceSnap();
  }

  onLike(faceSnapiId: number) {
    // Depend du faceSnap static qui n'existe plus
    if (this.buttonText === 'Like !') {
      this.faceSnap$ = this.faceSnapsService
        .likeFaceSnapById(faceSnapiId, 'like')
        .pipe(
          tap(() => {
            this.buttonText = 'Unlike !';
          })
        );

      //Provient maintenant de la methode dans le service, s'il est laissé ça double les vote
      // this.faceSnap.snaps++;
    } else {
      this.faceSnap$ = this.faceSnapsService
        .likeFaceSnapById(faceSnapiId, 'unlike')
        .pipe(
          tap(() => {
            this.buttonText = 'Like !';
          })
        );
    }
  }

  //Il est d'usage de mettre les methode private à la fin
  private getFaceSnap() {
    // Une route renvoie une string du coup pour faire matcher ce qu'on recupere en params et m'id du snap il faut le convertir
    const faceSnapId = parseInt(this.route.snapshot.params['id']);
    // const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  //Refactorisation de cette partie qui se trouvait dans ngOnInit
  //Ca permet un code maintenable et lisible
  private prepareInterface() {
    this.buttonText = 'Like !';
    this.isSnapped = false;
  }
}
