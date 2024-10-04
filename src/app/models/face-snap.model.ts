// export class FaceSnap {
//     title: string;
//     description: string;
//     createDate: Date;
//     snaps: number;
//     imageUrl: string;
//     constructor(title: string, description: string, createDate: Date, snaps: number, imageUrl: string) {
//         this.title = title;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.createDate = createDate;
//         this.snaps = snaps;
//     }
// }

//Raccourcis Typescript qui permet de supprimer initilisation et déclaration
// export class FaceSnap {
//     constructor(
//         public title: string,
//         public description: string,
//         public imageUrl: string,
//         public createdDate: Date,
//         public snaps: number,
//         public location?: string) {
//     }
// }

//Raccourcis Typescript qui permet de supprimer initilisation et déclaration

export class FaceSnap {
  // id permet d'identifier et snap un FaceSnap par identifiant
  //
  id!: number;
  title!: string;
  description!: string;
  imageUrl!: string;
  createdDate!: Date;
  snaps!: number;
  location?: string;
}
