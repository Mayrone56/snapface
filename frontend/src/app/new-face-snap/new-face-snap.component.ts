import { Component, OnInit } from '@angular/core';
// FormBuilder est un serivce mis à disposition par Angular qui facilite largement la création des formulaires réactifs
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss'],
})
export class NewFaceSnapComponent implements OnInit {
  // Variable qui contiendra l'objet du formulaire, son type est FormGroup (et non NgForm comme pour les formulaires template)
  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private faceSnapServices: FaceSnapsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Construction du formulaire avec formBuilder
    // [Validators.required] required est une fonction qui passe comme argement du coup on ne met pas de ()
    this.snapForm = this.formBuilder.group(
      {
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        imageUrl: [
          null,
          // pattern est un Validator qui prend un argument, donc on doit lui ajouter les parenthèses, contrairement à required
          [Validators.required, Validators.pattern(this.urlRegex)],
        ],
        location: [null],
      },
      {
        updateOn: 'blur',
      }
    );
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      // Ici map((formValue) => ({}) si on veut retourner un obj on doit mettre l'obj entre () sinon croit que c'est une fonction
      map((formValue) => ({
        ...formValue,
        createdDate: new Date(),
        snaps: 0,
        id: 0,
      }))
    );
    this.urlRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
  }
  // Comme avec les formulaires template, vous accédez au contenu du formulaire avec l'attribut  value  .
  onSubmitForm() {
    console.log(this.snapForm.value);
    this.faceSnapServices
      .addFaceSnap(this.snapForm.value)
      .pipe(tap(() => this.router.navigateByUrl('/facesnaps')))
      .subscribe();
  }
}
