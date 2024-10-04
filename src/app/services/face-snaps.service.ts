// Permet d'utiliser le decorateur @Injectable
import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';

//Decodeur @Injectable qui permet de déclarer une classe comme etant un service
@Injectable({
  //Dit à Angular d'enregistrer à la racine  le service, ça permet de n'avoir qu'une seule instance du service partagée à toute l'app
  providedIn: 'root',
})
export class FaceSnapsService {
  faceSnaps: FaceSnap[] = [
    {
      // Ajout de l'id qui est implémenté dans le model
      id: 1,
      title: 'Hey Mario !',
      description: 'Mon meilleur ami depuis tout petit !',
      imageUrl:
        'https://images.unsplash.com/photo-1622038492302-9e476cc5a584?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdDate: new Date(),
      snaps: 3,
    },
    {
      id: 2,
      title: 'Archibald',
      description: 'Mon meilleur ami depuis tout petit !',
      imageUrl:
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      createdDate: new Date(),
      snaps: 10,
    },
    {
      id: 3,
      title: 'Robot',
      description: 'Mon petit robot',
      imageUrl:
        'https://images.unsplash.com/photo-1691085397730-08669edab7fa?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdDate: new Date(),
      snaps: 200,
      // La location ne s'affichera pas car il y a une condition qui dit afficher uniquement si Paris dans face-snap.component.html pour la location
      location: 'Lyon',
    },
    {
      id: 4,
      title: 'Lego',
      description: 'Fan de Lego',
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      createdDate: new Date(),
      snaps: 300,
      location: 'Paris',
    },
  ];

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
  getAllFaceSnaps(): FaceSnap[] {
    return this.faceSnaps;
  }

  // Méthode pour obtenir un FaceSnap par son id
  getFaceSnapById(faceSnapId: number): FaceSnap {
    // const foundFaceSnap = this.faceSnaps.find((faceSnap) =>
    //   console.log('facesnap.id', faceSnap.id)
    // );
    const foundFaceSnap = this.faceSnaps.find(
      (faceSnap) => faceSnap.id === faceSnapId
    );
    console.log('foundFaceSnap;:', faceSnapId);
    if (!foundFaceSnap) {
      throw new Error('FaceSnap not found!');
    } else {
      return foundFaceSnap;
    }
  }

  // Méthode pour "snapper" ou "unsnapper" un FaceSnap par id
  // Il y a 2 arguments, l'id d'un snap et s'il snap ou unsnap. One le retrouve dans face-snap-component
  // (id: number, snapType: 'snap' | 'unsnap') sagit d'un literal type
  // Qui permet de passer directement une chaine de caractere et limiter les possibilités
  likeFaceSnapById(faceSnapId: number, snapType: 'like' | 'unlike'): void {
    const faceSnap = this.getFaceSnapById(faceSnapId);
    if (snapType === 'like') {
      faceSnap.snaps++;
      // Dans le github car il c'est implémenté en isLiked = boolean, nous ce sont des number et en dur
      // faceSnap.isSnapped = true;
    } else {
      faceSnap.snaps--;
    }
  }
}
