import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormSubmittedEvent,
  ReactiveFormsModule,
} from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  errorMessage?: string;
  disabled: boolean = false;

  constructor(private service: SessionService) {}

  ngOnInit(): void {
    this.loginForm.events.subscribe((e) => {
      if (e instanceof FormSubmittedEvent) {
        this.errorMessage = undefined;
        const { email, password } = e.source.value;
        // Disable form
        this.loginForm.disable();
        this.disabled = true;

        // SignIn Request
        this.service
          .signIn({ email, password })
          .pipe(
            catchError((err: string) => {
              // Enable form
              this.errorMessage = err;
              this.loginForm.enable();
              this.disabled = false;

              return EMPTY;
            })
          )
          .subscribe((e) => {
            this.service.saveTokens(e);
          });
      }
    });
  }
}
