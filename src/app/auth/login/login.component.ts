import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public AuthService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    this.AuthService.login(data.email, data.password);
  }

}
