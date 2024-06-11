import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormSubmittedEvent,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@services/users.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    permissionsLevel: new FormControl(),
    password: new FormControl(),
  });
  errorMessage?: string;
  disabled: boolean = false;

  constructor(private service: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm.events.subscribe((e) => {
      if (e instanceof FormSubmittedEvent) {
        this.errorMessage = undefined;
        // Disable form
        this.registerForm.disable();
        this.disabled = true;

        this.service
          .register({
            ...e.source.value,
            permissionsLevel: Number(e.source.value.permissionsLevel),
          })
          .pipe(
            catchError((err: string) => {
              // Enable form
              this.errorMessage = err;
              this.registerForm.enable();
              this.disabled = false;

              return EMPTY;
            })
          )
          .subscribe(() => {
            this.router.navigateByUrl('/users');
          });
      }
    });
  }
}
