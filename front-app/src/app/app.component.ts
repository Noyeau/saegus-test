import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appReady: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.initApp().subscribe(() => {
      console.log("appInit")
      this.appReady = true
    })

    this.authService.isConnected().subscribe(res=>{
      console.log(res)
      if(res){
        this.router.navigate(['/'])
        return 
      }
      this.router.navigate(['/offline'])

    })
  }
}
