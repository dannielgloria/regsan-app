import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  pwdForm: FormGroup;
  submitted = false;
  errorMessage: string = ''; // Para mostrar los mensajes

  constructor(private fb: FormBuilder, private router: Router) {
    this.pwdForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('email', 'confirmEmail')
    });
  }

  ngOnInit(): void {}

  get f() { return this.pwdForm.controls; }

  // Validador personalizado para que los correos coincidan
  mustMatch(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.controls[email];
      const confirmEmailControl = formGroup.controls[confirmEmail];

      // Mostrar mensaje de error o éxito en tiempo real
      if (confirmEmailControl.errors && !confirmEmailControl.errors['mustMatch']) {
        return;
      }

      if (emailControl.value !== confirmEmailControl.value) {
        confirmEmailControl.setErrors({ mustMatch: true });
        this.errorMessage = 'Los correos no coinciden'; // Mostrar mensaje de error
      } else {
        confirmEmailControl.setErrors(null);
        this.errorMessage = 'Los correos coinciden'; // Mostrar mensaje de éxito
      }
    };
  }

  // Controlar el envío del formulario
  onSubmit(): void {
    this.submitted = true;

    if (this.pwdForm.invalid) {
      return;
    }

    console.log('Formulario válido:', this.pwdForm.value);
  }

  // Redirigir al login
  onReset(): void {
    this.router.navigate(['/login']);
  }
}
