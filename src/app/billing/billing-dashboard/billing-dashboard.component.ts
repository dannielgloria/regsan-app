import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css']
})
export class BillingDashboardComponent implements OnInit {
  tramites: any[] = [];
  facturacionForm: FormGroup;

  // Definir las columnas que se mostrarán en la tabla
  columns: { [key: string]: boolean } = {
    id: true,
    client_rfc: true,
    email: true,
    phone_number: true,
    distinctive_denomination: true,
    generic_name: true,
    product_manufacturer: true,
    service_name: true,
    input_value: true,
    type_description: true,
    class_name: true,
    start_date: true,
    end_date: true,
    billing: true,
    payment_status: true,
    payment_date: true,
    collection_notes: true
  };

  constructor(
    private processesService: ProcessesService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario reactivo
    this.facturacionForm = this.fb.group({
      tramite_id: ['', Validators.required],
      billing: ['', Validators.required],
      payment_status: ['', Validators.required],
      payment_date: ['', Validators.required],
      collection_notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadTramites();
  }

  // Cargar trámites con sales_flag = true y payment_status distinto de 'pagado'
  loadTramites(): void {
    this.processesService.getAllProcesses().subscribe({
      next: (response) => {
        // Filtrar los trámites con sales_flag = true y payment_status distinto de 'pagado'
        this.tramites = response
          .filter((tramite: any) => tramite.sales_flag === true && tramite.payment_status !== 'paid')
          .map((tramite: any) => {
            // Evaluar el color de la fila según la fecha de pago
            tramite.rowColor = this.getRowColor(tramite.payment_date);
            return tramite;
          });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámites',
          text: 'No se pudieron cargar los trámites pendientes de facturación.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  // Obtener el color de la fila según la fecha de pago
  getRowColor(paymentDate: string): string {
    const currentDate = new Date();
    const dueDate = new Date(paymentDate);
    const twoMonthsBeforeDueDate = new Date(dueDate);
    twoMonthsBeforeDueDate.setMonth(dueDate.getMonth() - 2);

    if (currentDate > dueDate) {
      return 'table-danger'; // Rojo: vencido
    } else if (currentDate >= twoMonthsBeforeDueDate && currentDate <= dueDate) {
      return 'table-success'; // Verde: a vencerse
    }
    return ''; // Sin color si no cumple ninguna condición
  }

  // Actualizar la facturación
  updateFacturacion(): void {
    if (this.facturacionForm.valid) {
      const tramiteId = this.facturacionForm.get('tramite_id')?.value;
      const facturacionData = this.facturacionForm.value;

      this.processesService.updateFacturacion(tramiteId, facturacionData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Facturación Actualizada',
            text: 'Los datos de facturación han sido actualizados exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.facturacionForm.reset();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar facturación',
            text: 'Ocurrió un error al actualizar la facturación. Inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de enviar.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
