import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loading: boolean;

  constructor(
    public authService: AuthService,
    public store: Store<AppState>
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('uiState')
      .subscribe( ui => {
        this.loading = ui.loading;
      })
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.name, data.email, data.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
