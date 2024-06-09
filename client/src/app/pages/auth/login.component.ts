import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormSubmittedEvent,
  ReactiveFormsModule,
} from '@angular/forms';
import { EMPTY, catchError } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';

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

  constructor(private service: LoginService) {}

  ngOnInit(): void {
    this.loginForm.events.subscribe((e) => {
      if (e instanceof FormSubmittedEvent) {
        this.errorMessage = undefined;
        const { email, password } = e.source.value;
        this.loginForm.disable();
        this.disabled = true;

        this.service
          .sendReq({ email, password })
          .pipe(
            catchError((err: string) => {
              this.errorMessage = err;
              this.loginForm.enable();
              this.disabled = false;
              return EMPTY;
            })
          )
          .subscribe((e) => {
            this.service.saveSession(e);
          });
      }
    });
  }
}
