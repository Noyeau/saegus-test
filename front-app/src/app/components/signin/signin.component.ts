import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    adresse: new FormControl(''),

  })
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn(){
    console.log(this.signinForm)
   this.authService.signIn(this.signinForm.value).subscribe(res=>{
    this.router.navigate(['/offline'])
   })
  }


  setMail(mail){
    console.log(mail)
    this.signinForm.controls.email.setValue(mail)
  }

  setPassword(pwd){
    console.log(pwd)
    this.signinForm.controls.password.setValue(pwd)

  }

}
