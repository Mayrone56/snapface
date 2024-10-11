// Permet d'utiliser le decorateur @Injectable
import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

//Decodeur @Injectable qui permet de déclarer une classe comme etant un service
@Injectable({
  //Dit à Angular d'enregistrer à la racine  le service, ça permet de n'avoir qu'une seule instance du service partagée à toute l'app
  providedIn: 'root',
})
export class FaceSnapsService {
  constructor(private http: HttpClient) {}
  // Propriété avec tableau vide pour eviter les erreurs de compilations
  faceSnaps: FaceSnap[] = [];
  // Disponible maintenant via le backend
  // faceSnaps: FaceSnap[] = [
  //   {
  //     // Ajout de l'id qui est implémenté dans le model
  //     id: 1,
  //     title: 'Hey Mario !',
  //     description: 'Mon meilleur ami depuis tout petit !',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1622038492302-9e476cc5a584?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     createdDate: new Date(),
  //     snaps: 3,
  //   },
  //   {
  //     id: 2,
  //     title: 'Archibald',
  //     description: 'Mon meilleur ami depuis tout petit !',
  //     imageUrl:
  //       'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
  //     createdDate: new Date(),
  //     snaps: 10,
  //   },
  //   {
  //     id: 3,
  //     title: 'Robot',
  //     description: 'Mon petit robot',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1691085397730-08669edab7fa?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     createdDate: new Date(),
  //     snaps: 200,
  //     // La location ne s'affichera pas car il y a une condition qui dit afficher uniquement si Paris dans face-snap.component.html pour la location
  //     location: 'Lyon',
  //   },
  //   {
  //     id: 4,
  //     title: 'Lego',
  //     description: 'Fan de Lego',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     createdDate: new Date(),
  //     snaps: 300,
  //     location: 'Paris',
  //   },
  // ];

  // Cherche un FaceSnap par son id dans le tableau faceSnaps avec la fonction find() ;
  // Si le FaceSnap existe, on lui incrémente ses snaps ;
  // Sinon, on throw une erreur.
  // likeFaceSnapById(faceSnapId: number): void {
  //   const faceSnap = this.faceSnaps.find((faceSnap) => faceSnap.id === id);
  //   if (faceSnap) {
  //     faceSnap.snaps++;
  //   } else {
  //     throw new Error('FaceSnap not found!');
  //   }
  // }
  // unlikeFaceSnapById(faceSnapId: number): void {
  //   const faceSnap = this.faceSnaps.find((faceSnap) => faceSnap.id === id);
  //   if (faceSnap) {
  //     faceSnap.snaps--;
  //   } else {
  //     throw new Error('FaceSnap not found!');
  //   }
  // }

  // Cette méthode retournera, comme son nom l'indique, tous les FaceSnaps contenus dans le service.
  // La methode suivi de : FaceSnap[] permet de stipuler en Typescript le type, ici un tableau
  // Il faudra centraliser toutes les interactions avec les FaceSnaps dans FaceSnapsService
  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  // Méthode pour obtenir un FaceSnap par son id
  // Commenté pour httpClient
  // getFaceSnapById(faceSnapId: number): FaceSnap {
  //   // const foundFaceSnap = this.faceSnaps.find((faceSnap) =>
  //   //   console.log('facesnap.id', faceSnap.id)
  //   // );
  //   const foundFaceSnap = this.faceSnaps.find(
  //     (faceSnap) => faceSnap.id === faceSnapId
  //   );
  //   console.log('foundFaceSnap;:', faceSnapId);
  //   if (!foundFaceSnap) {
  //     throw new Error('FaceSnap not found!');
  //   } else {
  //     return foundFaceSnap;
  //   }
  // }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(
      `http://localhost:3000/facesnaps/${faceSnapId}`
    );
  }

  // Méthode pour "snapper" ou "unsnapper" un FaceSnap par id
  // Il y a 2 arguments, l'id d'un snap et s'il snap ou unsnap. One le retrouve dans face-snap-component
  // (id: number, snapType: 'snap' | 'unsnap') sagit d'un literal type
  // Qui permet de passer directement une chaine de caractere et limiter les possibilités
  likeFaceSnapById(
    faceSnapId: number,
    snapType: 'like' | 'unlike'
  ): Observable<FaceSnap> {
    // const faceSnap = this.getFaceSnapById(faceSnapId);
    // if (snapType === 'like') {
    //   faceSnap.snaps++;
    //   // Dans le github car il c'est implémenté en isLiked = boolean, nous ce sont des number et en dur
    //   // faceSnap.isSnapped = true;
    // } else {
    //   faceSnap.snaps--;
    // }
    return this.getFaceSnapById(faceSnapId).pipe(
      map((faceSnap) => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'like' ? 1 : -1),
      })),
      //L'Observable extérieur ici est une requête GET. Il va donc émettre une fois et compléter (ou émettre une erreur si le serveur retourne une erreur). On n'aura donc jamais la situation où l'Observable extérieur émet de nouveau alors qu'une souscription à l'Observable intérieur est en cours.
      // On peut donc, dans ce cas, utiliser l'opérateur haut niveau que l'on veut !
      switchMap((updatedFaceSnap) =>
        this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          updatedFaceSnap
        )
      )
    );
  }

  addFaceSnap(formValue: {
    title: string;
    description: string;
    imageUrl: string;
    location?: string;
  }): Observable<FaceSnap> {
    // const faceSnap: FaceSnap = {
    //   ...formValue,
    //   snaps: 0,
    //   createdDate: new Date(),
    //   // Ajoute 1 à l' id  du dernier ajouté au tableau pour générer le nouveau, puisque les  id  des FaceSnap sont des entiers croissants ;
    //   id: this.faceSnaps[this.faceSnaps.length - 1].id + 1,
    // };
    // // Ajoute le FaceSnap au tableau.
    // this.faceSnaps.push(faceSnap);

    return this.getAllFaceSnaps().pipe(
      // Ici on sépare chaque map afin de bien détailler les étapes
      // On retourne un tableau trié par ID pour s'assurer que le dernier élément du tableau possède l'ID le plus élevé.
      // On retourne ensuite le dernier élément de ce tableau.
      // On retourne le nouveau FaceSnap avec son ID valable.
      map((faceSnaps) =>
        [...faceSnaps].sort((a: FaceSnap, b: FaceSnap) => a.id - b.id)
      ),
      map((sortedFaceSnaps) => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map((previousFaceSnap) => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFaceSnap.id + 1,
      })),
      switchMap((newFaceSnap) =>
        this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap)
      )
    );
  }
}
