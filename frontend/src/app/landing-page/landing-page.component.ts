// Importations nécessaires pour créer le composant et gérer les formulaires et la navigation
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // NgForm permet de gérer les formulaires template-driven
import { Router } from '@angular/router'; // Router permet la navigation entre les différentes pages

// Déclaration du décorateur @Component pour indiquer qu'il s'agit d'un composant Angular
@Component({
  selector: 'app-landing-page', // Le sélecteur permet d'insérer ce composant dans un template HTML avec la balise <app-landing-page>
  templateUrl: './landing-page.component.html', // Fichier HTML associé à ce composant
  styleUrls: ['./landing-page.component.scss'], // Fichier SCSS (feuille de style) associé à ce composant
})
// Classe du composant
export class LandingPageComponent {
  // Définition d'une propriété userEmail :
  // Cette variable est utilisée dans le formulaire pour stocker l'email de l'utilisateur
  // La valeur initiale est vide, elle sera remplie lorsque l'utilisateur saisira son email dans l'input
  userEmail!: string;

  // Le constructeur permet d'injecter des services dans le composant
  // Ici, le service Router est injecté pour permettre la navigation vers une autre page
  constructor(private router: Router) {}

  // Méthode appelée lorsque l'utilisateur clique sur le bouton "Continuer vers Snapface"
  // Elle utilise le service Router pour naviguer vers la page 'facesnaps'
  onContinue() {
    // router.navigateByUrl permet de rediriger l'utilisateur vers la page indiquée (dans ce cas, 'facesnaps')
    this.router.navigateByUrl('facesnaps');
  }

  // Méthode appelée lors de la soumission du formulaire d'email
  // form: NgForm est le paramètre représentant le formulaire entier, accessible grâce à la directive ngForm
  onSubmitForm(form: NgForm) {
    // Log des données soumises dans la console. form.value contient les valeurs du formulaire
    // Ici, cela affichera l'objet { userEmail: "valeur entrée par l'utilisateur" }
    console.log('Souscription de ', form.value);
  }
}
