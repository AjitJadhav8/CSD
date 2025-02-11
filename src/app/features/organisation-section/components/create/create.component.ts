import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  selectedSection: string | null = null;
  selectedCustomerOption: string | null = null;
  selectedProjectOption: string | null = null;
  selectedEmployeeOption: string | null = null;
  
}
