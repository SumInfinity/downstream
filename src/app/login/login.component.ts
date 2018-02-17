import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: { email: "", password: "" } = { email: "", password: "" };
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSignin() {
    this.authService.signinUser(this.user.email, this.user.password);
  }
  onSigninFacebook() {
    this.authService.signinFacebook();
  }
  onSigninGoogle() {
    this.authService.signinGoogle();
  }
  onSigninTwitter() {
    this.authService.signinTwitter();
  }

}
