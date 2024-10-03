import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})
export class ManageClientsComponent {
  clientForm: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      rfc: ['', Validators.required],
      business_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      contact_first_name: ['', Validators.required],
      contact_last_name: ['', Validators.required]
    });
  }

  registerClient() {
    if (this.clientForm.valid) {
      this.clientService.registerClient(this.clientForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente registrado',
            text: 'El cliente ha sido registrado exitosamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.clientForm.reset();
            }
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ocurrió un error al intentar registrar al cliente. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        }
      });
    } else {
      // Si el formulario no es válido, mostramos una alerta indicando que los campos faltan
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de enviar.',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }
}
