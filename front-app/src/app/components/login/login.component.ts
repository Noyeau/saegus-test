import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public connected=false

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  constructor(
    private authService: AuthService,
    private router : Router
  ) {
    this.authService.getAuthStatus().subscribe(res=>{
      this.connected = res.isConnected
    })
  }

  ngOnInit() {
  }


  logIn() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
      console.log("loginnnnn", res)
      this.router.navigate(['/'])
    })
  }


  logOut() {
    this.authService.logOut()
  }

}
