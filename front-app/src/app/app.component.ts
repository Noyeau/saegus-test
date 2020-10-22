import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appReady: boolean = false

  constructor(
    private authService: AuthService
  ) {
    this.authService.initApp().subscribe(() => {
      this.appReady = true
    })
  }
}
