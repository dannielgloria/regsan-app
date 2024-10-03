import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-processes',
  templateUrl: './manage-processes.component.html',
  styleUrls: ['./manage-processes.component.css']
})
export class ManageProcessesComponent implements OnInit {
  clients: any[] = [];
  tramites: any[] = [];
  processForm: FormGroup;
  updateProcessForm: FormGroup;
  deleteProcessForm: FormGroup;
  serviceIsOther: boolean = false;

  constructor(
    private clientService: ClientService,
    private processesService: ProcessesService,
    private fb: FormBuilder
  ) {
    this.processForm = this.fb.group({
      client_rfc: ['', Validators.required],
      distinctive_denomination: ['', Validators.required],
      generic_name: ['', Validators.required],
      product_manufacturer: ['', Validators.required],
      service_name: ['', Validators.required],
      other_service: [''],
      input_value: ['', Validators.required],
      type_description: ['', Validators.required],
      class_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['', Validators.required],
      process_description: ['', Validators.required],
      completion_percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      cofepris_entry_date: ['', Validators.required],
      cofepris_status: ['', Validators.required],
      cofepris_entry_number: ['', Validators.required],
      cofepris_link: ['', Validators.required],
      assigned_consultant: ['', Validators.required],
      additional_information: ['']
    });

    this.updateProcessForm = this.fb.group({
      client_rfc: ['', Validators.required],
      tramite_id: ['', Validators.required],
      distinctive_denomination: ['', Validators.required],
      generic_name: ['', Validators.required],
      product_manufacturer: ['', Validators.required],
      service_name: ['', Validators.required],
      other_service: [''],
      input_value: ['', Validators.required],
      type_description: ['', Validators.required],
      class_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['', Validators.required],
      process_description: ['', Validators.required],
      completion_percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      cofepris_entry_date: ['', Validators.required],
      cofepris_status: ['', Validators.required],
      cofepris_entry_number: ['', Validators.required],
      cofepris_link: ['', Validators.required],
      assigned_consultant: ['', Validators.required],
      additional_information: ['']
    });

    this.deleteProcessForm = this.fb.group({
      client_rfc: ['', Validators.required],
      tramite_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        this.clients = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar clientes',
          text: 'No se pudieron cargar los clientes. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  onServiceChange(event: any) {
    const value = event.target.value;
    this.serviceIsOther = value === 'Otro';
  }

  onClientChange(event: any) {
    const rfc = event.target.value;
    this.processesService.searchProcessByBusinessName(rfc).subscribe({
      next: (response) => {
        this.tramites = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámites',
          text: 'No se pudieron cargar los trámites para el cliente seleccionado.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  registerProcess() {
    if (this.processForm.valid) {
      const processData = this.processForm.value;
      this.processesService.createProcess(processData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Trámite registrado',
            text: 'El trámite ha sido registrado exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.processForm.reset();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ocurrió un error al registrar el trámite. Inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de registrar el trámite.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  updateProcess() {
    if (this.updateProcessForm.valid) {
      const tramiteId = this.updateProcessForm.get('tramite_id')?.value;
      const updatedProcessData = this.updateProcessForm.value;

      this.processesService.updateProcess(tramiteId, updatedProcessData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Trámite actualizado',
            text: 'Los datos del trámite han sido actualizados exitosamente.',
            confirmButtonText: 'Aceptar'
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al actualizar el trámite. Inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de actualizar el trámite.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  deleteProcess() {
    const tramiteId = this.deleteProcessForm.get('tramite_id')?.value;

    if (tramiteId) {
      this.processesService.deleteProcess(tramiteId).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Trámite eliminado',
            text: 'El trámite ha sido eliminado exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.deleteProcessForm.reset();
        },
        error: (error) => {
          if (error.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se puede eliminar el trámite porque tiene datos técnicos asociados.',
              confirmButtonText: 'Aceptar'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'Ocurrió un error al eliminar el trámite. Inténtalo nuevamente.',
              confirmButtonText: 'Aceptar'
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, selecciona un trámite para eliminar.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
