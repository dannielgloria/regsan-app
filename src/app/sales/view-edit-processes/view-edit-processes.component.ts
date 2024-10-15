import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-edit-processes',
  templateUrl: './view-edit-processes.component.html',
  styleUrls: ['./view-edit-processes.component.css']
})
export class ViewEditProcessesComponent implements OnInit {
  clients: any[] = [];
  tramites: any[] = [];
  selectedCliente: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['Pendiente', 'En Proceso', 'Finalizado', 'Cancelado'];

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
    status: true,
    technical_data: true,
    completion_percentage: true,
    cofepris_entry_date: true,
    cofepris_status: true,
    cofepris_entry_number: true,
    assigned_consultant: true,
    additional_information: true
  };

  constructor(private clientService: ClientService, private processesService: ProcessesService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        this.clients = response.map((client: any) => client.business_name);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar clientes',
          text: 'No se pudieron cargar los clientes. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      }
    });
  }

  loadProcesses(): void {
    let param = '';
    if (this.selectedCliente) {
      param = `search?businessName=${this.selectedCliente}`;
    } else if (this.selectedStatus) {
      param = `status?status=${this.selectedStatus}`;
    }

    this.processesService.getProcesses(param).subscribe({
      next: (response) => {
        // Filtramos los trámites que tienen sales_flag = false
        this.tramites = response.filter((tramite: any) => !tramite.sales_flag);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámites',
          text: 'No se pudieron cargar los trámites. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      }
    });
  }

  getColumnKeys(): string[] {
    return Object.keys(this.columns);
  }
}
