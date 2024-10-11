// FaceSnapList sert de parent à FaceSnap, c'est lui qui liste
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

//Permet d'utiliser un service dans un component, c'est une injection de dependance
import { FaceSnapsService } from '../services/face-snaps.service';
import { interval, Observable, Subject } from 'rxjs';
import { take, takeUntil, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss'],
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  //Déclaration de variables
  faceSnaps$!: Observable<FaceSnap[]>;
  // Etape 1 pour la desctruction de l'Observable
  // Un Subject est un Observable qu'on peut faire émettre à la demande
  // Il émettra une seule fois, au moment de la destruction du component.
  private destroy$!: Subject<boolean>;

  // Injection du service dans le constructeur
  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit() {
    // Etape 2
    this.destroy$ = new Subject<boolean>();
    // Il faut ensuite initialiser  destroy$  dans  ngOnInit()

    // this.faceSnaps = this.faceSnapsService.faceSnaps;
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

    interval(1000)
      .pipe(
        take(3),
        // tap(value => console.log(value))
        //Facon plus courte de l'ecrire
        tap(console.log),
        // Etape 4
        // Cet opérateur dit à l'Observable  interval  de continuer à émettre tant que  destroy$  n'a pas émis
        // Mais dès que  destroy$  émet, de compléter l'Observable.
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // Etape 3
  // La norme est d'ajouter ngOnDestroy à la fin de la classe
  ngOnDestroy() {
    // La dernière étape de la création de  destroy$  est de le faire émettre dans  ngOnDestroy()
    // Pour faire émettre un Subject, on appelle sa méthode  next()  :
    this.destroy$.next(true);
  }
}
