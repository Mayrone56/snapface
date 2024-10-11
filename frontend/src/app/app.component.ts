// DECOMMENTER POUR TESTER OBSERVABLES
// import { Component, OnInit } from '@angular/core';
// import { interval, of } from 'rxjs';
// import {
//   concatMap,
//   mergeMap,
//   delay,
//   exhaustMap,
//   map,
//   switchMap,
//   take,
//   tap,
// } from 'rxjs/operators';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {
//   redTrainsCalled = 0;
//   yellowTrainsCalled = 0;

//   ngOnInit() {
//     interval(500)
//       .pipe(
//         take(10),
//         map((value) => (value % 2 === 0 ? 'rouge' : 'jaune')),
//         tap((color) =>
//           console.log(
//             `La lumière s'allume en %c${color}`,
//             `color: ${this.translateColor(color)}`
//           )
//         ),
//         mergeMap((color) => this.getTrainObservable$(color)),
//         tap((train) =>
//           console.log(
//             `Train %c${train.color} ${train.trainIndex} arrivé !`,
//             `font-weight: bold; color: ${this.translateColor(train.color)}`
//           )
//         )
//       )
//       .subscribe();
//   }

//   getTrainObservable$(color: 'rouge' | 'jaune') {
//     const isRedTrain = color === 'rouge';
//     isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
//     const trainIndex = isRedTrain
//       ? this.redTrainsCalled
//       : this.yellowTrainsCalled;
//     console.log(
//       `Train %c${color} ${trainIndex} appelé !`,
//       `text-decoration: underline; color: ${this.translateColor(color)}`
//     );
//     return of({ color, trainIndex }).pipe(delay(isRedTrain ? 5000 : 6000));
//   }

//   translateColor(color: 'rouge' | 'jaune') {
//     return color === 'rouge' ? 'red' : 'yellow';
//   }
// }

// DECOMMENTER POUR SANS OBSERVABLE
import { Component, OnInit } from '@angular/core';
import { filter, interval, Observable, tap } from 'rxjs'; // Importation des fonctions et classes nécessaires depuis la bibliothèque RxJS.
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

// La classe AppComponent est le composant principal de cette application. Elle implémente l'interface OnInit, ce qui signifie qu'une méthode ngOnInit sera appelée après l'initialisation du composant
export class AppComponent implements OnInit {
  // Création d'une propriété `interval$` de type Observable<number>. Le point d'exclamation (`!`) signifie que TypeScript accepte que cette variable soit définie plus tard (après l'initialisation)
  interval$!: Observable<string>;

  // Méthode ngOnInit, exécutée juste après la création du composant, idéale pour l'initialisation des variables ou l'appel des observables
  ngOnInit(): void {
    // Le $ est une convention qui permet de dire que c'est un Obervable
    // Toutes les secondes, l'Observable émet un nombre
    // const interval$ = interval(1000);

    // // Ce nombre est ensuite capté et traité par la méthode passée à  subscribe()
    // interval$.subscribe((value) => console.log('Observable', value));

    // // Test qui prmet d'identifier plusieurs d'instances d'Obervables
    // setTimeout(() => {
    //   interval$.subscribe((value) =>
    //     console.log('Observable démarre aprés 3sec', value)
    //   );
    // }, 3000);

    // Finalement, on assigne à la propriété `interval$` (qui est de type Observable<number>) un Observable
    // généré par la méthode `interval(1000)`. Cela crée un flux d'événements qui émet un nombre chaque seconde
    // Le premier opérateur que vous allez utiliser est l'opérateur  map()  qui permet de transformer les émissions d'un Observable
    // this.interval$ = interval(1000).pipe(map((value) => value * 10));
    this.interval$ = interval(1000).pipe(
      // L'opérateur  filter()  permet de filtrer les émissions, laissant passer uniquement celles qui vous intéressent.
      filter((value) => value % 3 === 0),
      // Attention ici on change le tye pe donnée, il faut donc changer le type de la propriété interval$ our string
      map((value) =>
        value % 2 === 0
          ? `Je suis ${value} et je suis pair !`
          : `Je suis ${value} et je suis impair !`
      ),
      // Effet secondaire avec tap()
      // L'opérator tap() permet de fair zquelque chose sur les émissions d'un Observable
      tap((text) => this.logger(text))
    );
  }
  logger(text: string) {
    console.log(`Log: ${text}`);
  }
}
