import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  sectors: string[] = [];
  industries: string[] = [];
  domains: string[] = [];

  constructor(private dataService: DataService,private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMasterCategories();
  }

  fetchMasterCategories(): void {
    this.dataService.getMasterCategories().subscribe(
      
      (data) => {
        console.log('Master categories fetched successfully:', data); // Log the fetched data

        this.sectors = data.sectors;
        this.industries = data.industries;
        this.domains = data.domains;
      },
      (error) => {
        console.error('Error fetching master categories:', error);
      }
    );
  }




























  showModal: boolean = false;
  
  showDomainModal: boolean = false;

  toggleDomainModal() {
    this.showDomainModal = !this.showDomainModal;
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  selectedSection: string = 'customer';
  showCustomerForm: boolean = false;
  showDomainForm: boolean = false;

  customers = [
    { 
      id: 1, 
      name: 'ABC Corp', 
      website: 'www.abc.com', 
      email: 'contact@abc.com',
      state: 'California',
      country: 'USA',
      status: 'Active',
      domain: 'IT',
      phone: '1234567890',
      type: 'Enterprise',
      city: 'Los Angeles',
      pincode: '90001'
    },
    { 
      id: 2, 
      name: 'XYZ Ltd', 
      website: 'www.xyz.com', 
      email: 'info@xyz.com',
      state: 'Texas',
      country: 'USA',
      status: 'Inactive',
      domain: 'Finance',
      phone: '9876543210',
      type: 'Startup',
      city: 'Houston',
      pincode: '77001'
    }
  ];


  customerDomains = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'Finance' }
  ];

  deleteCustomer(id: number) {
    this.customers = this.customers.filter(c => c.id !== id);
  }

  deleteDomain(id: number) {
  }


  selectedCustomerOption: string = '';
  // Dummy Data for Table
  dummyCustomers = [
    { name: 'ABC Corp', website: 'www.abccorp.com', email: 'abc@corp.com', state: 'California', country: 'USA', status: 'Active', domain: 'IT', phone: '1234567890', type: 'Corporate', city: 'Los Angeles', pincode: '90001' },
    { name: 'XYZ Ltd', website: 'www.xyzltd.com', email: 'xyz@ltd.com', state: 'New York', country: 'USA', status: 'Inactive', domain: 'Finance', phone: '9876543210', type: 'Enterprise', city: 'New York City', pincode: '10001' }
  ];
}
