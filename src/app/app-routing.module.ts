import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';

// Ce tableau va lier les routes (URL) aux components correspondants de l'app
const routes: Routes = [
  // route associée à /facesnaps qui est associé au component FaceSnapListComponent et sera donc affiché au clic sur le lien
  //Essayer de mettre les routes les plus longues/complexe en 1er
  // C'est comme les params avec Express
  { path: 'facesnaps/:id', component: SingleFaceSnapComponent },
  { path: 'facesnaps', component: FaceSnapListComponent },
  // Route vide pour la landing page
  { path: '', component: LandingPageComponent },
];

@NgModule({
  // forRoot pour configurer le routing principal
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
