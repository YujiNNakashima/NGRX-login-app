import { Store } from '@ngrx/store';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;
  subscription: Subscription;

  constructor(
    public AuthService: AuthService,
    public store: Store<AppState>
    
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('uiState')
      .subscribe((state) => this.loading = state.loading);
  }

  onSubmit(data: any) {
    this.AuthService.login(data.email, data.password);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
