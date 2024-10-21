import { Component, OnInit } from '@angular/core';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-processes',
  templateUrl: './view-processes.component.html',
  styleUrls: ['./view-processes.component.css']
})
export class ViewProcessesComponent implements OnInit {
  tramites: any[] = [];
  sortedColumn: string = '';
  ascending: boolean = true;

  columns: { [key: string]: boolean } = {
    id: true,
    client_rfc: true,
    email: true,
    phone_number: true,
    distinctive_denomination: true,
    generic_name: true,
    payment_date: true,
  };

  constructor(private processesService: ProcessesService) {}

  ngOnInit(): void {
    this.loadAllProcesses();
  }

  loadAllProcesses(): void {
    this.processesService.getAllProcesses().subscribe({
      next: (response) => {
        this.tramites = response.map((tramite: any) => {
          tramite.rowColor = this.getRowColor(tramite.payment_date);
          return tramite;
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámites',
          text: 'No se pudieron cargar los trámites.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  getRowColor(paymentDate: string): string {
    const currentDate = new Date();
    const dueDate = new Date(paymentDate);
    const twoMonthsBeforeDue = new Date(dueDate);
    twoMonthsBeforeDue.setMonth(dueDate.getMonth() - 2);

    if (currentDate > dueDate) return 'table-danger'; // Rojo: vencido
    if (currentDate >= twoMonthsBeforeDue && currentDate <= dueDate) return 'table-success'; // Verde: a vencerse
    return ''; // Sin color
  }

  sortBy(column: string): void {
    if (this.sortedColumn === column) {
      this.ascending = !this.ascending;
    } else {
      this.sortedColumn = column;
      this.ascending = true;
    }

    this.tramites.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.ascending ? -1 : 1;
      if (valueA > valueB) return this.ascending ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortedColumn !== column) return 'bi bi-arrow-down-up';
    return this.ascending ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
  }
}
