import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  selectedCustomerOption: string = '';
  // Dummy Data for Table
  dummyCustomers = [
    { name: 'ABC Corp', website: 'www.abccorp.com', email: 'abc@corp.com', state: 'California', country: 'USA', status: 'Active', domain: 'IT', phone: '1234567890', type: 'Corporate', city: 'Los Angeles', pincode: '90001' },
    { name: 'XYZ Ltd', website: 'www.xyzltd.com', email: 'xyz@ltd.com', state: 'New York', country: 'USA', status: 'Inactive', domain: 'Finance', phone: '9876543210', type: 'Enterprise', city: 'New York City', pincode: '10001' }
  ];
}
